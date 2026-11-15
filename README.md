# Civix: Indian Polity for UPSC

A study app for Indian Polity, built for UPSC Prelims and Mains. It runs as a website on laptops and as an Android app for the Google Play Store, from one codebase.

**What's inside**
- 88 chapters in 11 units, following the standard Polity syllabus and updated to November 2026
- 229 previous-year questions (Prelims and Mains), quizzes, a Prelims simulator and a 60-second Lightning Round
- 580+ flashcards with spaced repetition and swipe gestures
- Answer Studio for Mains writing practice, with a timer, word count and self-grading
- An Article explorer, an amendments timeline and a Quick Revise pack
- XP, levels (Rookie → Legend), streaks, a daily goal, daily quests, combos and badges
- Light and dark themes, sound and haptics, works offline, no accounts or tracking

## Project layout

| Path | What it is |
| --- | --- |
| `www/` | The whole app: plain HTML, CSS and JavaScript. No build step. |
| `www/data/` | All study content (chapters, PYQs, articles, amendments) |
| `android/` | Native Android project (Capacitor). Generated, then customised for signing. |
| `resources/` | Source icon, splash and Play Store graphics |
| `.github/workflows/` | Builds the Android app and publishes the website automatically |

## Use it on a laptop

Open the website once GitHub Pages is on (see below), or run it locally:

```bash
npm run serve
```

Then open http://localhost:8080.

## Turn on the website (GitHub Pages)

1. On GitHub, open the repository, then **Settings → Pages**.
2. Under **Source**, choose **GitHub Actions**.
3. Every push to `main` then publishes `www/` to `https://<your-username>.github.io/<repo-name>/`.

## Get the Android app

### Test on your phone (no setup needed)
Every push to `main` builds a debug APK:
1. Open the **Actions** tab, then the latest **Android build** run.
2. Download the **civix-debug-apk** artifact, unzip it and copy the `.apk` to your phone.
3. Open it on the phone, and allow "Install unknown apps" when asked.

### Publish on Google Play

**1. Create an upload key (once).** On any computer with Java installed:

```bash
keytool -genkeypair -v -keystore civix-upload.jks -alias civix -keyalg RSA -keysize 2048 -validity 10000
```

Keep this file and its passwords safe and private. Never commit it.

**2. Add the key to GitHub as secrets.** Go to **Settings → Secrets and variables → Actions → New repository secret** and add:

| Secret | Value |
| --- | --- |
| `CIVIX_KEYSTORE_BASE64` | Output of `base64 -w0 civix-upload.jks` (on macOS: `base64 -i civix-upload.jks`) |
| `CIVIX_KEYSTORE_PASSWORD` | The keystore password |
| `CIVIX_KEY_ALIAS` | `civix` |
| `CIVIX_KEY_PASSWORD` | The key password |

**3. Build.** Run **Actions → Android build → Run workflow**, or push to `main`. Download the **civix-release-for-play-store** artifact. It contains the `.aab` file for Google Play.

**4. Upload to Play Console** (https://play.google.com/console):
1. Create the app. Name it **Civix: Polity for UPSC**, choose **App** and **Free**.
2. Under **Test and release → Production** (or start with **Internal testing**), create a release and upload the `.aab`. Let Google manage the app signing key.
3. Fill in the store listing. Use `resources/play-store-icon-512.png` as the icon and `resources/feature-graphic.png` as the feature graphic. Add at least 2 phone screenshots.
4. **Privacy policy URL**: `https://<your-username>.github.io/<repo-name>/privacy.html`
5. **Data safety**: choose "No data collected" and "No data shared". All progress stays on the device.
6. **Content rating**: answer the questionnaire (Education, no sensitive content).
7. **Target audience**: 18 and over is the simplest choice for an exam-prep app.
8. New personal developer accounts must run a closed test with testers for 14 days before going to production. Google shows the current requirement in the console.

Each CI run uses its run number as the `versionCode`, so every upload is automatically newer than the last.

### Change the app ID (optional, before the first upload)
The package name is `com.civix.polity`. To use your own, change `appId` in `capacitor.config.json` and `namespace` and `applicationId` in `android/app/build.gradle`. Then move the Java folder `android/app/src/main/java/com/civix/polity` to match. It cannot be changed after the first Play Store upload.

## Develop locally with Android Studio

```bash
npm install
```

```bash
npx cap sync android
```

```bash
npx cap open android
```

After you edit anything in `www/`, run `npx cap sync android` again. To regenerate icons and splash screens from `resources/`, run `npm run assets`.

## Content updates

Study content is in `www/data/`. The date shown in the app comes from `SITE_META.updated` in `www/data/chapters/index.js`. When you change content, also change `VERSION` in `www/sw.js` so website visitors get the new files.

## Privacy

Civix collects no personal data. Progress is saved only on the device. See `www/privacy.html`.
