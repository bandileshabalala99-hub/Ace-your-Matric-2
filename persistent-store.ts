"use client"

import { useSyncExternalStore } from "react"

export interface PersistentStore<T> {
  get: () => T
  set: (updater: T | ((prev: T) => T)) => void
  subscribe: (listener: () => void) => () => void
  useValue: () => T
}

export function createPersistentStore<T>(key: string, initial: T): PersistentStore<T> {
  let value: T = initial
  let loaded = false
  const listeners = new Set<() => void>()

  function load() {
    if (loaded || typeof window === "undefined") return
    loaded = true
    try {
      const raw = window.localStorage.getItem(key)
      if (raw) value = JSON.parse(raw) as T
    } catch {
      value = initial
    }
  }

  function get() {
    load()
    return value
  }

  function set(updater: T | ((prev: T) => T)) {
    load()
    value = typeof updater === "function" ? (updater as (prev: T) => T)(value) : updater
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Storage full or unavailable — keep the in-memory value.
    }
    listeners.forEach((l) => l())
  }

  function subscribe(listener: () => void) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  function useValue() {
    return useSyncExternalStore(subscribe, get, () => initial)
  }

  return { get, set, subscribe, useValue }
}
