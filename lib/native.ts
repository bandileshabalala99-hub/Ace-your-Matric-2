import { Capacitor } from "@capacitor/core"

export function isNativeApp() {
  return typeof window !== "undefined" && Capacitor.isNativePlatform()
}
