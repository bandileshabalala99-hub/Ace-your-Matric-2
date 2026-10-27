// Patches the generated Android project with storage permissions and the AdMob App ID.
// Run after `npx cap add android` (or via `npm run cap:android`).
import { existsSync, readFileSync, writeFileSync } from "node:fs"

const ADMOB_APP_ID = "ca-app-pub-8846775707566006~2539720110"
const manifestPath = "android/app/src/main/AndroidManifest.xml"

if (!existsSync(manifestPath)) {
  console.error(`Missing ${manifestPath}. Run "npx cap add android" first.`)
  process.exit(1)
}

let manifest = readFileSync(manifestPath, "utf8")

const permissions = [
  '<uses-permission android:name="android.permission.INTERNET" />',
  '<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />',
  '<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" android:maxSdkVersion="32" />',
  '<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" android:maxSdkVersion="29" />',
  '<uses-permission android:name="com.google.android.gms.permission.AD_ID" />',
]

for (const permission of permissions) {
  const name = permission.match(/android:name="([^"]+)"/)[1]
  if (!manifest.includes(`"${name}"`)) {
    manifest = manifest.replace("</manifest>", `    ${permission}\n</manifest>`)
  }
}

if (!manifest.includes("com.google.android.gms.ads.APPLICATION_ID")) {
  manifest = manifest.replace(
    /<application([^>]*)>/,
    `<application$1>\n        <meta-data android:name="com.google.android.gms.ads.APPLICATION_ID" android:value="${ADMOB_APP_ID}" />`,
  )
}

if (!manifest.includes("requestLegacyExternalStorage")) {
  manifest = manifest.replace("<application", '<application android:requestLegacyExternalStorage="true"')
}

writeFileSync(manifestPath, manifest)
console.log("Android manifest updated with storage permissions and AdMob App ID.")
