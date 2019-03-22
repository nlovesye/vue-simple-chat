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

const POST_ = async (ctx, next) => {
    ctx.jsonResp({
        info: 'hello'
    })
}

module.exports = {
    GET_,
    POST_
}