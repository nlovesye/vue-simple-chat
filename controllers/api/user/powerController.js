// 获取权限路由
const GET_ = async (ctx, next) => {
    let {
        username
    } = ctx.query
    let user = await ctx.mdb.findOne('user', {
        username
    })
    if (!user) {
        ctx.errResp({
            msg: '用户不存在'
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
        depth: r.depth,
        sort: r.sort
    }))
    ctx.arrResp(routers)
}

// 新建菜单
const POST_addMenu = async (ctx, next) => {
    let {
        key,
        path,
        name,
        depth,
        sort,
        pKey
    } = ctx.request.body
    if (depth === -1) {
        depth = (depth || -1) + 1
        let target = await ctx.mdb.findOne('routers', {
            $or: [{
                key
            }, {
                path
            }, {
                name
            }]
        })
        if (target) {
            ctx.errResp({
                msg: '存在重复项'
            })
            return
        }
        await ctx.mdb.insert('routers', {
            key,
            path,
            name,
            depth,
            sort,
            roles: ['admin'],
            children: []
        })
    } else {
        depth = (depth || 0) + 1
        let parent = await ctx.mdb.findOne('routers', {
            key: pKey
        })
        if (!parent) {
            ctx.errResp({
                msg: '父级菜单不存在'
            })
            return
        }
        if (parent.children && parent.children.some(item => (item.key === key || item.name === name || item.path === path))) {
            ctx.errResp({
                msg: '存在重复项'
            })
            return
        }
        let newChildren = parent.children ? [...parent.children] : []
        newChildren.push({
            key,
            path,
            name,
            depth,
            sort,
            roles: ['admin'],
            children: []
        })
        let newObj = {
            ...parent,
            children: newChildren
        }
        await ctx.mdb.update('routers', { key: pKey }, newObj)
    }
    await ctx.jsonResp({
        msg: '新增成功'
    })
}

// 编辑菜单
const POST_editMenu = async (ctx, next) => {
    let { key, sort, name, path, depth, pKey } = ctx.request.body
    let target = null, newObj = null
    if (depth === -1) {
        target = await ctx.mdb.findOne('routers', { key })
        if (!target) {
            ctx.errResp({
                msg: '不存在菜单项'
            })
            return
        }
        newObj = { ...target, key, sort, name, path }
        console.log('newObj', newObj)
    } else {
        target = await ctx.mdb.findOne('routers', {
            key: pKey
        })
        if (!target) {
            ctx.errResp({
                msg: '不存在菜单项'
            })
            return
        }
        newObj = { ...target }
        newObj = newObj.children ? newObj.children.map(item => {
            if (item.key === key) {
                return { ...item, key, sort, name, path }
            } else {
                return item
            }
        }) : {...target}
    }
    await ctx.mdb.update('routers', { key: target.key }, newObj)
    ctx.jsonResp({
        msg: '操作成功'
    })
}

module.exports = {
    GET_,
    POST_addMenu,
    POST_editMenu
}