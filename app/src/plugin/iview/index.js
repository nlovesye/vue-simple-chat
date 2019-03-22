import Vue from 'vue'
import {
  Button,
  Table,
  Card,
  Input,
  Form,
  FormItem,
  Icon,
  Message
} from 'iview'

// Vue.use(iView)
// console.log('iview: ', Message)

Vue.component('Button', Button)
Vue.component('Table', Table)
Vue.component('Card', Card)
Vue.component('IInput', Input)
Vue.component('Form', Form)
Vue.component('FormItem', FormItem)
Vue.component('Icon', Icon)
Vue.prototype.$Message = Message
