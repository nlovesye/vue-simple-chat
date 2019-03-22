<template>
  <Submenu
    v-if="nav.children && nav.children.length"
    :name="nav.name"
  >
    <template slot="title">
      <Icon type="ios-build" />
      {{ nav.title }}
    </template>
    <NavItem
      v-for="child in nav.children"
      :key="child.name"
      :nav="child"
    />
  </Submenu>
  <MenuItem
    v-else
    :name="nav.name"
  >
    {{ nav.title }}
  </MenuItem>
</template>

<script>
import { Submenu, MenuItem } from 'iview'
export default {
  name: 'NavItem',
  components: { Submenu, MenuItem },
  props: ['nav']
}
</script>
