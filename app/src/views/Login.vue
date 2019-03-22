<template>
  <div class="login">
    <Card class="login-card">
        <p slot="title">登录</p>
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
          <FormItem prop="user">
              <i-input type="text" v-model="formInline.user" placeholder="用户名">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
              </i-input>
          </FormItem>
          <FormItem prop="password">
              <i-input type="password" v-model="formInline.password" placeholder="密码">
                  <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </i-input>
          </FormItem>
          <FormItem>
              <Button type="primary" @click="login('formInline')">
                登录
              </Button>
          </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      formInline: {
        user: '',
        password: ''
      },
      ruleInline: {
        user: [
          { required: true, message: '请输入用户名', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { type: 'string', min: 6, message: '密码不能少于6个字符', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    async login (name) {
      const valid = await this.$refs[name].validate()
      if (valid) {
        const { user, password } = this.formInline
        if (user === 'admin' && password === '@test1') {
          this.$router.push('/')
        } else {
          this.$Message.error('用户名或密码错误')
        }
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="less">
.login{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
