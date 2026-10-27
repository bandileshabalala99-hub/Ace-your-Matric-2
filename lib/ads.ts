"use client"

import { AdMob, BannerAdPosition, BannerAdSize } from "@capacitor-community/admob"
import { isNativeApp } from "./native"

export const ADMOB_APP_ID = "ca-app-pub-8846775707566006~2539720110"
export const BANNER_AD_ID = "ca-app-pub-8846775707566006/4279555075"
export const REWARDED_AD_ID = "ca-app-pub-8846775707566006/8151139443"

const isTesting = process.env.NODE_ENV !== "production"
let initPromise: Promise<void> | null = null

export function initAds() {
  if (!isNativeApp()) return Promise.resolve()
  initPromise ??= AdMob.initialize({ initializeForTesting: isTesting })
  return initPromise
}

export async function showBannerAd() {
  if (!isNativeApp()) return
  await initAds()
  await AdMob.showBanner({
    adId: BANNER_AD_ID,
    adSize: BannerAdSize.ADAPTIVE_BANNER,
    position: BannerAdPosition.BOTTOM_CENTER,
    margin: 0,
    isTesting,
  })
}

export async function showNativeRewardedAd(): Promise<boolean> {
  await initAds()
  await AdMob.prepareRewardVideoAd({ adId: REWARDED_AD_ID, isTesting })
  const reward = await AdMob.showRewardVideoAd()
  return Boolean(reward)
}
