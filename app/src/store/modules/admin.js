import routerTitles from '@router/routerTitles'
export default {
  // namespaced: true,
  state: {
    siderCollapsed: false,
    routerTitles,
    openNavs: [],
    activeNav: '',
    activeObj: {}
  },
  getters: {
    // admin 后台管理菜单
    navs: (state, getters, rootState, rootGetters) => rootGetters.getChildRouter('Admin'),
    navsTree: (state, getters, rootState, rootGetters) => {
      let navs = rootGetters.getChildRouter('Admin')
      const objToTree = (obj) => {
        // console.log('obj', obj)
        const menus = obj.path.split('/')
        const lastIndex = menus.length - 1
        if (menus instanceof Array && menus.length > 1) {
          return objToTree({
            // ...obj,
            component: null,
            path: menus.slice(0, lastIndex).join('/'),
            name: menus[lastIndex - 1],
            title: state.routerTitles[menus[lastIndex - 1]] || menus[lastIndex - 1],
            children: [{
              ...obj,
              title: obj.title || state.routerTitles[menus[lastIndex]]
            }]
          })
        } else {
          return obj
        }
      }
      let navsTree = navs.map(item => objToTree(item))
      navsTree = navsTree.reduce((rt, cur) => {
        // console.log('reduce:', rt, cur)
        if (rt.some(item => item.name === cur.name)) {
          rt = rt.map(item => item.name === cur.name ? ({
            ...item,
            children: [...item.children, ...cur.children]
          }) : item)
          return rt
        } else {
          return [...rt, cur]
        }
      }, [])
      return navsTree
    }
  },
  mutations: {
    // 改变侧边栏折叠状态
    changeCollapsed (state) {
      state.siderCollapsed = !state.siderCollapsed
    },
    // 选择菜单（MenuItem）时触发
    navSelect (state, { name, vm }) {
      // console.log('navSelect', vm)
      state.activeNav = name
      state.activeObj = this.getters.navs.find(item => item.name === name) || {}
      vm.$router.push({ name })
    },
    // 当 展开/收起 子菜单时触发
    navOpenChange (state, names) {
      // console.log('navOpenChange', state, names)
      state.openNavs = names
    }
  },
  actions: {}
}
