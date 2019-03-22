<template>
  <div class="system-pages">
    THIS IS system-pages
    <Button @click="getData">
      click me
    </Button>
  </div>
</template>

<script>

export default {
  name: 'Pages',
  methods: {
    async getData () {
      try {
        let res = await this.$_axios.get('/api/test')
        console.log('res', res)
      } catch (error) {
        console.log(error)
      }
    }
  },
  created () {
    // this.$router.push('/login')
  }
}
</script>
