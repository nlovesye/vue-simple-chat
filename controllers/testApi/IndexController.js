const GET_ = async (ctx, next) => {
    let rt = await ctx.mdb.find('user', {})
    ctx.body = {
        success: true,
        msg: 'this is test msg!',
        data: rt,
        reqHost: ctx.request.header.host.split(':')[0],
        port: ctx.request.header.host.split(':')[1]
    }
}


const update = async (ctx) => {
    let db = await ctx.mdb.connect()
    // console.log('db', db)
    await db.collection('order').update({
        number: {
            $ne: -1
        }
    }, {
        $set: {
            id: 1
        }
    }, {
        multi: true
    })
}

// 新增订单
const GET_addOrder = async (ctx, next) => {
    const getRand = (num, isNumber = false) => {
        num = '' + num
        let len = num.length
        let rand = parseInt(Math.random() * num, 10)
        rand = '' + rand
        rand = rand.length < len ? rand.padStart(len, '0') : rand
        rand = isNumber ? parseInt(rand, 10) : rand
        return rand
    }
    const status = ['未确认', '已确认', '运输中', '待收货']
    try {
        // let tasks = []
        // for (let index = 0; index < 20; index++) {
        //     const order = {
        //         number: `OD20190308${getRand(1000)}`,
        //         status: status[getRand(3, 1)]
        //     }
        //     tasks.push(ctx.mdb.insert('order', order))
        // }
        // await Promise.all[tasks]
        await update(ctx)
        // console.log(task)
    } catch (error) {
        console.log(error)
    }
    ctx.body = '添加数据成功' + Math.random()
}

// 获取订单列表
const POST_orderList = async (ctx, next) => {
    let orderList,
        total = 0
    let {
        pageNo,
        pageSize
    } = JSON.parse(ctx.request.body)
    try {
        let _skip = (pageNo - 1) * pageSize,
            _limit = pageSize
        orderList = await ctx.mdb.find('order', {}, { _skip, _limit})
        orderList = orderList.map(item => ({ ...item, id: item._id }))
        total = await ctx.mdb.find('order', {})
        total = total.length
        console.log('req', pageNo, pageSize, total)
    } catch (error) {
        console.error(error)
        ctx.jsonResp({
            info: '发生错误'
        })
    }
    ctx.jsonResp({
        list: orderList,
        total
    })
}

module.exports = {
    GET_,
    GET_addOrder,
    POST_orderList
}