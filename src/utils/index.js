import { dirname } from './path'

/**
 * 缓存成功的promise
 */
export const memoizePromise = (fn, hasher) => {
  const memo = {}
  const defaultHasher = v => v

  // 默认拿第一个传入的参数做key
  hasher = hasher || defaultHasher

  return (...args) => {
    const key = hasher(...args)
    const val = memo[key]

    if (val) {
      return val
    }

    const promise = fn(...args)
    promise.then(() => {
      memo[key] = promise
    })

    return promise
  }
}

export function getPublicPath(name) {
  const currentScript = getCurrentScript(name)

  if (!currentScript || !currentScript.src) {
    return ''
  }

  return dirname(currentScript.src) + '/'
}

function getCurrentScript(name) {
  if (document.currentScript) {
    return document.currentScript
  }

  // For IE6-9 browsers, the script onload event may not fire right
  // after the script is evaluated. Kris Zyp found that it
  // could query the script nodes and the one that is in "interactive"
  // mode indicates the current script
  // ref: http://goo.gl/JHfFW

  // 开放id获取当前js
  const scripts = document.getElementsByTagName('script')
  let scriptWithSrc = null

  for (let i = scripts.length - 1; i >= 0; i--) {
    const script = scripts[i]
    if (script.readyState === 'interactive') {
      return script
    }

    if (name && (script.id === name || script.id === 'ns-mfe-script-' + name)) {
      return script
    }

    if (!scriptWithSrc && script.src) {
      scriptWithSrc = script
    }
  }

  // 兜底的情况，获取最后一个 script 节点
  return scriptWithSrc || scripts[scripts.length - 1]
}
