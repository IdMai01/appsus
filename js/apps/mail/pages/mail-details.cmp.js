import { mailService } from '../services/mail-service.js'

export default {
  props: ['mail'],
  template: `
        <section v-if="mail"  class="main-mail-details">
            <p class="mail-subject-detail">{{mail.subject}}</p>
            <p>From:<span class="mail-from-name">{{mail.from}} </span> <span class="mail-from-mail"> {{mail.to}} </span></p>
            <p>{{mail.body}}</p>
             <div class="actions">
                       <!-- <button @click="remove(mail.id)">Delete</button> -->
                        <!-- <router-link :to="'/mail'">Back</router-link> -->
                    </div>
        </section>
    `,
  data() {
    return {
      mail: null,
    }
  },
  methods: {
    remove(id) {
      this.$emit('remove', id)
    },
  },
  created() {},
  computed: {},
  watch: {
    '$route.params.mailId': {
      handler() {
        const id = this.$route.params.mailId
        mailService.get(id).then((mail) => {
          this.mail = mail
        })
      },
      immediate: true,
    },
  },
}
