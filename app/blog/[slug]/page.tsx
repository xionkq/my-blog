import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import path from 'node:path'
// TODO: add more default styles
import utilsStyle from '@/app/ui/utils.module.css'

const ERROR_MESSAGE_NOT_FOUND = 'error not found'

interface PostMetaData {
  title?: string
  date?: Date
  updated?: string
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPostInfoBySlug(params.slug)

  if (post === ERROR_MESSAGE_NOT_FOUND) {
    return <div>404</div>
  }

  return (
    <article className={utilsStyle.post}>
      <h2>{post.metaData.title}</h2>
      <p>{post.metaData.date?.toString()}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
    </article>
  )
}

async function getPostInfoBySlug(slug: string) {
  try {
    const postsDirectory = './app/blog/(posts)'
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const matterResult = matter.read(fullPath)

    const processedContent = await remark().use(html).process(matterResult.content)
    return {
      metaData: matterResult.data as PostMetaData,
      content: processedContent.toString(),
    }
  } catch (err) {
    console.error(err)
    return ERROR_MESSAGE_NOT_FOUND
  }
}
