export function genUrlFromNo(no) {
  const len = no.length
  if (no.startsWith('CF')) {
    return `https://codeforces.com/problemset/problem/${no.substring(
      2,
      len - 1
    )}/${no.substring(len - 1)}`
  }
  return null
}
