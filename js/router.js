import appHome from './pages/app-home.cmp.js'
import mail from './apps/mail/pages/mail-index.cmp.js'
import keep from './apps/keep/pages/note-index.cmp.js'
import mailDetails from './apps/mail/pages/mail-details.cmp.js'
import mailEdit from './apps/mail/pages/mail-edit.cmp.js'

const routes = [
  {
    path: '/',
    component: appHome,
  },
  {
    path: '/mail',
    component: mail,
  },
  {
    path: '/keep',
    component: keep,
  },
  {
    path: '/mail/:mailId',
    component: mailDetails,
  },
  {
    path: '/mail/edit',
    component: mailEdit,
  },
]

export const router = VueRouter.createRouter({
  routes,
  history: VueRouter.createWebHashHistory(),
})
