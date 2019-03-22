module.exports = () => {
    return async (ctx, next) => {
        try {
            await next()
        } catch (err) {
            console.log('----发生错误----', err)
            if (err.status === 401) {
                // ctx.status = 401
                ctx.errResp({
                    code: 401,
                    msg: 'token验证失败'
                })
            } else if (ctx.response.status = err.statusCode || err.status || 500) {
                ctx.body = {
                    msg: err.message
                }
            } else {
                ctx.body = {
                    msg: err.message
                }
            }
            ctx.app.emit('error', err, ctx)
        }
    }
}