<template>
  <Layout class="admin">
    <Header class="header">
      <span class="logo">管理后台</span>
      <Menu mode="horizontal" theme="dark" active-name="1">
         <MenuItem name="1">
            <Icon type="ios-navigate"></Icon>
            Item 1
          </MenuItem>
          <MenuItem name="2">
              <Icon type="ios-keypad"></Icon>
              Item 2
          </MenuItem>
          <MenuItem name="3">
              <Icon type="ios-analytics"></Icon>
              Item 3
          </MenuItem>
          <MenuItem name="4">
              <Icon type="ios-paper"></Icon>
              Item 4
          </MenuItem>
      </Menu>
    </Header>
    <Layout>
      <Sider
        class="sider"
        collapsible
        v-model="admin.siderCollapsed"
      >
        <Menu
          theme="dark"
          width="auto"
          accordion
          :active-name="admin.activeNav"
          :open-names="admin.openNavs"
          @on-select="handleSelect"
          @on-open-change="navOpenChange"
        >
          <template
            v-for="nav in navsTree"
          >
            <NavItem
              :nav="nav"
              :key="nav.name"
            />
          </template>
        </Menu>
      </Sider>
      <Layout :style="{padding: '0 10px 10px'}">
          <Breadcrumb :style="{margin: '10px 0'}">
              <BreadcrumbItem>管理后台</BreadcrumbItem>
              <!-- <BreadcrumbItem v-if="admin.openNavs.length">{{ admin.routerTitles[admin.openNavs[0]] }}</BreadcrumbItem> -->
              <BreadcrumbItem v-if="admin.activeObj.title">{{ admin.activeObj.title }}</BreadcrumbItem>
          </Breadcrumb>
          <Content>
              <router-view />
          </Content>
      </Layout>
    </Layout>
    <Footer class="footer">2011-2020 &copy; TalkingData</Footer>
</Layout>
</template>

<script>
import { Layout, Header, Content, Footer, Sider, Menu, Breadcrumb, MenuItem, BreadcrumbItem } from 'iview'
import { mapState, mapGetters, mapMutations } from 'vuex'
import NavItem from './NavItem'
export default {
  name: 'Admin',
  components: { Layout, Header, Content, Footer, Sider, Menu, Breadcrumb, MenuItem, BreadcrumbItem, NavItem },
  data () {
    return {}
  },
  computed: {
    ...mapState(['admin']),
    ...mapGetters(['navs', 'navsTree'])
  },
  methods: {
    ...mapMutations([
      'changeCollapsed',
      'navSelect',
      'navOpenChange'
    ]),
    handleSelect (name) {
      this.navSelect({ name, vm: this })
    }
  },
  created () {
    // this.navOpenChange(['system'])
    // this.navSelect('pages')
    // console.log('admin:', this.navs)
  }
}
</script>

<style lang="less">
.admin{
  .header{
    display: flex;
    justify-content: space-between;
    padding: 0 24px;

    .logo{
      color: #fff;
      font-size: 24px;
    }
  }
  .sider{
    position: relative;
    padding-bottom: 48px;

    .ivu-layout-sider-trigger{
      position: absolute;
      &:hover{
        background-color: #333;
      }
    }
  }
  .footer{
    background-color: #24292e;
  }
}
</style>
