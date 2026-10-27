import * as React from "react"
export function Button({ children, ...props }: any) {
  return <button {...props}>{children}</button>
}
