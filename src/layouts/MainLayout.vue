<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Navigation
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Actions',
    caption: 'Tasks outside projects',
    icon: 'check_circle',
    link: 'actions'
  },
  {
    title: 'Priority List',
    caption: 'Prioritise for today/this week',
    icon: 'list',
    link: 'priorities'
  },
  {
    title: 'Projects',
    caption: 'Projects and Tasks',
    icon: 'table_chart',
    link: 'projects'
  },
  {
    title: 'Dashboard',
    caption: 'Reports',
    icon: 'dashboard',
    link: 'dashboard'
  },
  {
    title: 'Settings',
    caption: 'Settings and Preferences',
    icon: 'settings',
    link: 'settings'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
