const jwt = require('jsonwebtoken')
const moment = require('moment')

// 用户登录
const POST_ = async (ctx, next) => {
    let {
        username,
        pwd
    } = ctx.request.body
    let user = await ctx.mdb.findOne('user', { username, pwd })
    if (!user) {
        ctx.errResp({
            code: 401,
            msg: '账号或密码错误'
        })
        return
    }
    let routers = await ctx.mdb.find('routers', {
        $or: [{
            roles: user.role
        }]
    })
    routers = routers.map(r => ({
        path: r.path,
        key: r.key,
        name: r.name,
        children: r.children,
        sort: r.sort,
        icon: r.icon
    }))
    if (user) {
        const userToken = {
            username,
            loginTime: Date.now()
        }
        const expiresIn = moment().add(7, 'days').format('x')
        const token = jwt.sign(userToken, ctx.app.secret, { expiresIn })
        ctx.jsonResp({
            username: user.username,
            token,
            routers
        }, {
            msg: '登陆成功'
        })
    } else {
        ctx.errResp({
            code: 401,
            msg: '账号或密码错误'
        })
    }
}

module.exports = {
    POST_
}