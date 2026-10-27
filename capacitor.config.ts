import type { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
  appId: "za.co.aceyourmatric.app",
  appName: "Ace Your Matric",
  webDir: "out",
  android: {
    allowMixedContent: false,
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
}

export default config
