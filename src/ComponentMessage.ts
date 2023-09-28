import { h, defineComponent } from 'vue'
import VueMarkdown from '@crazydos/vue-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

export default defineComponent({
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  setup(props, { slots }) {
    return () => {
      return h(
        VueMarkdown,
        {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeRaw],
          markdown: props.message,
          sanitize: false,
        },
        slots
      )
    }
  },
})
