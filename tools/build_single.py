"""Bundle www/ into one self-contained HTML file (dist/Civix.html) for laptops.
Double-click the file to open it in any browser. Works offline (fonts fall back to system fonts)."""
import base64, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WWW = os.path.join(ROOT, 'www')
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, 'dist', 'Civix.html')

def read(p):
    with open(os.path.join(WWW, p), encoding='utf-8') as f:
        return f.read()

def data_uri(p, mime):
    with open(os.path.join(WWW, p), 'rb') as f:
        return f'data:{mime};base64,' + base64.b64encode(f.read()).decode()

logo = data_uri('assets/logo.svg', 'image/svg+xml')
fav = data_uri('assets/favicon.svg', 'image/svg+xml')
icon = data_uri('assets/icons/icon-192.png', 'image/png')

html = read('index.html')
html = html.replace('<link rel="manifest" href="manifest.webmanifest">\n', '')
html = html.replace('href="assets/favicon.svg"', f'href="{fav}"')
html = html.replace('href="assets/icons/icon-192.png"', f'href="{icon}"')
html = html.replace('<link rel="stylesheet" href="css/app.css">', '<style>\n' + read('css/app.css') + '\n</style>')

def inline_script(m):
    src = m.group(1)
    js = read(src)
    js = js.replace('assets/logo.svg', logo)
    js = js.replace('<a href="privacy.html">Privacy</a> · ', '')
    js = js.replace('</script', '<\\/script')
    return f'<script>/* {src} */\n{js}\n</script>'

html = re.sub(r'<script src="([^"]+)"></script>', inline_script, html)
html = html.replace('src="assets/logo.svg"', f'src="{logo}"')

assert 'src="data/' not in html and 'src="js/' not in html and 'css/app.css' not in html
os.makedirs(os.path.dirname(OUT), exist_ok=True)
with open(OUT, 'w', encoding='utf-8') as f:
    f.write(html)
print(OUT, round(len(html.encode()) / 1024), 'KB')
