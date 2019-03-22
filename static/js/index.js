(function () {
    let createData = (count) => {
        let rt = []
        for (let i = count; i--;) {
            let obj = {
                title: '标题' + (i + 1),
                time: '2018-12-11'
            }
            rt.unshift(obj)
        }
        return rt
    }
    const listData = createData(2)
    let appendData = (target, data) => {
        for (let i = data.length; i--;) {
            let item = data[i]
            let li = document.createElement('li')
            let liChildren = document.createElement('span'),
                liChildren2 = document.createElement('span')
            liChildren.appendChild(document.createTextNode(item.title))
            liChildren.style.marginRight = '20px'
            liChildren2.appendChild(document.createTextNode(item.time))
            li.append(liChildren)
            li.append(liChildren2)
            target.prepend(li)
        }
    }
    let appendData2 = (target, data) => {
        data.forEach(item => {
            let li = document.createElement('li')
            let liChildren = document.createElement('span'),
                liChildren2 = document.createElement('span')
            liChildren.appendChild(document.createTextNode(item.title))
            liChildren.style.marginRight = '20px'
            liChildren2.appendChild(document.createTextNode(item.time))
            li.append(liChildren)
            li.append(liChildren2)
            target.appendChild(li)
        })
    }
    // let oul = document.getElementById('oul')

    // let fragment = document.createDocumentFragment()
    // console.time('st')
    // appendData(fragment, listData)
    // oul.appendChild(fragment)
    // console.timeEnd('st')

    // let fragment2 = document.createDocumentFragment()
    // console.time('st2')
    // appendData2(fragment2, listData)
    // oul.appendChild(fragment2)
    // console.timeEnd('st2')


    function* generatorFun () {
        let x = 'hello',
            y = 'ns'
            z = 'oh'
        y = yield x
        yield y
        x = yield z
        return 'yes.'
    }

    let gf = generatorFun()
    console.log(gf.next())
    console.log(gf.next(12345))
    console.log(gf.next())
    console.log(gf.next())

})()