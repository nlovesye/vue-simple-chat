(function() {
    var Observe = (function () {
        var _events = {}

        return {
            // 注册
            regist: function (type, fn) {
                if (!_events[type]) {
                    _events[type] = [fn]
                } else {
                    _events[type].push(fn)
                }
            },
    
            // 发出消息
            emit: function (type, payload) {
                if (!_events[type]) {
                    return
                }
                for (let i = 0, len = _events[type].length; i < len; i++) {
                    _events[type][i].call(this, payload)
                }
            },
    
            // 移除
            remove: function (type, fn) {
                if (_events[type] instanceof Array) {
                    let i = _events[type].length - 1
                    while (i) {
                        console.log('1')
                        fn === _events[type][i] && _events[type].splice(i, 1)
                        i--
                    }
                }
            } 
        }
    })()


    /* 小红的代码 */
    function header () {
        let initCount = 0
        const showCount = function () {
            initCount += 1
            document.getElementById('count').innerHTML = `评论数：${initCount}`
        }
        showCount()
        Observe.regist('changeCount', showCount)
    }

    /* 小明的代码 */
    function content () {
        const btn = document.getElementById('btn')
        btn.addEventListener('click', function () {
            const info = document.getElementById('info')
            console.log(info.value)
            Observe.emit('changeCount', 'addCount')
        })
    }

    header()
    content()
})()