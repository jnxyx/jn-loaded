/*
 * 资源加载插件
 *
 */

function jnLoaded(config) {
    var args = Object.assign({
        origin: '',
        resources: [],
        process: null,
        complete: null
    }, config)
    var resLen = resources.length
    var pcs = resLen
    pcs === 0 && 'function' === typeof(args.complete) && args.complete()
    resources.forEach(function(item, index) {
        var img = new Image()
        img.src = args.origin ? args.origin + item : item
        img.onload = function() {
            pcs--
            'function' === typeof(args.process) && args.process.call(null, {
                pcs: (resLen - pcs) + '/' + resLen,
                pct: (100 * (resLen - pcs) / resLen).toFixed(2) + '%'
            })
            pcs === 0 && 'function' === typeof(args.complete) && args.complete()
        }
    })
}

if ('object' === typeof module && module.exports) {
    module.exports = jnLoaded
}