export function getNonce() {
  let text = ""
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

export function debounce(func: (...args: any) => any, timeout = 300) {
  let timer: NodeJS.Timeout | undefined
  return (...args: any) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      timer = undefined
      func.apply(this, args)
    }, timeout)
  }
}
