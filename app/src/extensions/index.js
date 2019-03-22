import oAxios from '@extensions/prototype/axios'
import mixin from '@extensions/mixin'
import directives from '@extensions/directive'

export default {
  install (Vue, options) {
    /* 全局混入 */
    Vue.mixin(mixin)
    /* 注入全局指令 */
    for (const directive in directives) {
      if (directives.hasOwnProperty(directive)) {
        Vue.directive(directive, directives[directive])
      }
    }
    /* 注入原型属性|方法 */
    Vue.prototype.$_axios = oAxios
  }
}
