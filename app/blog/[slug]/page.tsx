// TODO: make my own md style in the future
// import utilsStyle from '@/app/ui/utils.module.css'
import 'github-markdown-css/github-markdown.css'
import 'highlight.js/styles/default.css'
import NotFound from '@/app/not-found'
import { getPostInfoBySlug } from '@/app/lib/posts'
import { ErrorMessage } from '@/app/lib/error-message'

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPostInfoBySlug(params.slug)

  if (post === ErrorMessage.ERROR_MESSAGE_NOT_FOUND) {
    return <NotFound />
  }

  return (
    <div className={`max-w-4xl mx-auto py-10 markdown-body`}>
      <h1 className="mb-1 mt-0">{post.metaData.title}</h1>
      <span className="text-slate-400">{post.metaData.date?.toLocaleString('zh-CN', { timeZone: 'UTC' })}</span>
      <article className="mt-10 text-slate-700" dangerouslySetInnerHTML={{ __html: post.content }}></article>
    </div>
  )
}
