const head = document.head || document.getElementsByTagName('head')[0]
const hourMillisecond = 60 * 60 * 1000

export default function(url, options={}) {
  if (options.hour) {
    url += url.indexOf('?') > 0 ? '&' : '?'
    url += `_t=${Math.floor(new Date() / hourMillisecond)}`
  }

  return new Promise((resolve, reject) => {
    let node = document.createElement('script')

    node.charset = 'utf-8'
    node.async = true
    node.crossOrigin = 'anonymous'

    if (options.name) {
      node.id = 'ns-mfe-script-' + options.name
    }

    if ('onload' in node) {
      node.onload = onload
    } else {
      node.onreadystatechange = function() {
        if (/loaded|complete/.test(node.readyState)) {
          onload()
        }
      }
    }

    if ('onerror' in node) {
      node.onerror = reject
    }

    function onload() {
      node.onreadystatechange = node.onload = null
      // head.removeChild(node)
      node = null

      resolve()
    }

    node.src = url
    head.appendChild(node)
  })
}
