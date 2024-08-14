export function dirname(p) {
  return p
    .split('/')
    .slice(0, -1)
    .join('/')
}

// sep有可能是+号这种正则内置符号
export function join(parts, sep='/') {
  let replacer = new RegExp(escapeRegExp(sep)+'{1,}', 'g')
  return parts.join(sep).replace(replacer, sep)
}

// 把字符串转为安全的正则源码
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
