module.exports = (db) => {
    return async (ctx, next) => {
        // console.log(1)
        await db.connect()
        // console.log(3)
        ctx.mdb = db
        await next()
    }
}