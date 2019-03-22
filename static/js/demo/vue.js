(function () {
    class Vue {

        constructor (opt) {
            this.$data = opt.data || {}
            this.defineData(this.$data)
        }

        defineData (data) {
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    Object.defineProperty(this, key, {
                        configurable: true,
                        enumerable: true,
                        get: () => {
                            return this.$data[key]
                        },
                        set: (newVal) => {
                            this.$data[key] = newVal
                        }
                    })
                }
            }
        }
    }

    const vm = new Vue({
        data: {
            msg: 'hello'
        }
    })
    const gd = (id) => document.getElementById(id)
    const info = gd('info')
    const btn = gd('btn')
    const p = gd('p')
    

    info.addEventListener('keyup', function (e) {
        // this.value = e.target.value
        vm.msg = e.target.value
        p.innerHTML = vm.msg
    })

    btn.addEventListener('click', function () {
        p.innerHTML = vm.msg
    })

    info.value = vm.msg
    p.innerHTML = vm.msg

})()