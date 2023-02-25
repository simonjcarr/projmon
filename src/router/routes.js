
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'actions', component: () => import('pages/ActionsPage.vue') },
      { path: 'priorities', component: () => import('pages/PrioritiesPage.vue') },
      { path: 'projects', component: () => import('pages/ProjectsPage.vue') },
      { path: 'dashboard', component: () => import('pages/DashboardPage.vue') },
      { path: 'settings', component: () => import('pages/SettingsPage.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
