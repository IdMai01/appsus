import { mailService } from '../services/mail-service.js'
import mailList from '../cmps/mail-list.cmp.js'
import mailFilter from '../cmps/mail-filter.cmp.js'
import mailDetails from './mail-details.cmp.js'

export default {
  template: `
 <section class="mail-main-layout">
 <mail-filter @filtered="filterMail"/>
  <router-link to="/mail/edit">Compose Mail</router-link>
    <mail-list :mails="mailsForDisplay" @remove="remove" />
     <mail-details v-if="selectedMail" @close="selectedMail = null" :mail="selectedMail" @remove="remove"/>
 </section>
`,
  components: {
    mailList,
    mailFilter,
    mailDetails,
  },
  data() {
    return {
      mails: null,
      filterBy: null,
      selectedMail: null,
    }
  },
  created() {
    mailService.query().then((mails) => (this.mails = mails))
  },
  methods: {
    filterMail(filterBy) {
      this.filterBy = filterBy
    },
    selectMail(mail) {
      this.selectedMail = mail
    },
    remove(id) {
      mailService
        .remove(id)
        .then(() => {
          console.log('Deleted successfully')
          const idx = this.mails.findIndex((mail) => mail.id === id)
          this.mails.splice(idx, 1)
          showSuccessMsg('Deleted2 successfully')
        })
        .catch((err) => {
          console.log(err)
          showErrorMsg('Failed to remove')
        })
    },
  },
  computed: {
    mailsForDisplay() {
      // להוסיף פילטר לפי פרום ולפי בודי
      let mails = this.mails
      if (!this.filterBy) return mails
      const regex1 = new RegExp(this.filterBy.subject, 'i')
      const regex2 = new RegExp(this.filterBy.body, 'i')
      const regex3 = new RegExp(this.filterBy.from, 'i')
      mails = mails.filter(
        (mail) =>
          regex1.test(mail.subject) ||
          regex2.test(mail.body) ||
          regex3.test(mail.from)
      )
      return mails
    },
  },
}
