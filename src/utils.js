export function genUrlFromNo(no) {
  const len = no.length
  if (no.startsWith('CF')) {
    // CF1445A -> 1445/A
    // CF1445A2 -> 1445/A2
    // https://codeforces.com/problemset/problem/1445/A
    if (no.substring(len - 1).match(/[A-Z]/)) {
      return `https://codeforces.com/problemset/problem/${no.substring(
        2,
        len - 1
      )}/${no.substring(len - 1)}`
    } else {
      return `https://codeforces.com/problemset/problem/${no.substring(
        2,
        len - 2
      )}/${no.substring(len - 2)}`
    }
  }
  if (no.startsWith('Gym')) {
    // Gym100001A -> 100001/A
    // Gym100001A2 -> 100001/A2
    // https://codeforces.com/gym/100001/problem/A
    if (no.substring(len - 1).match(/[A-Z]/)) {
      return `https://codeforces.com/gym/${no.substring(
        3,
        len - 1
      )}/problem/${no.substring(len - 1)}`
    } else {
      return `https://codeforces.com/gym/${no.substring(
        3,
        len - 2
      )}/problem/${no.substring(len - 2)}`
    }
  }
  if (no.startsWith('ABC') || no.startsWith('ARC') || no.startsWith('AGC')) {
    const contestStr = no.substring(0, len - 1)
    const problemStr = no.substring(0, len - 1) + '_' + no.substring(len - 1)
    // contests/abc269/tasks/abc269_a
    return `https://atcoder.jp/contests/${contestStr}/tasks/${problemStr}`
  }
  return null
}
