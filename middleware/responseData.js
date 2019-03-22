module.exports = () => {
    return async (ctx, next) => {
        ctx.errResp = (obj = {}) => {
            ctx.response.body = {
                success: false,
                code: 500,
                msg: '服务器错误！',
                ...obj
            }
        }
        ctx.jsonResp = (obj = {}, cover = {}) => {
            ctx.response.body = {
                success: true,
                code: 200,
                msg: 'success!',
                data: { ...obj },
                ...cover
            }
        }
        ctx.arrResp = (obj = []) => {
            ctx.response.body = {
                success: true,
                code: 200,
                msg: 'success!',
                data: [ ...obj ]
            }
        }
        await next()
    }
}