const _ = async (ctx, next) => {
    await ctx.render('index', {
        title: 'nloves'
    })
}

module.exports = {
    _
}