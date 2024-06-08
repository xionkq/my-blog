import { remark } from 'remark'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeHighlight from 'rehype-highlight'

export async function markdownToHtml(markdownContent: string) {
  return await remark()
    .use(remarkRehype) // markdown to html
    .use(rehypeStringify) // parsing html
    .use(rehypeHighlight) // html highlighting
    .process(markdownContent)
}
