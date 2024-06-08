// TODO: add more default styles
import utilsStyle from '@/app/ui/utils.module.css'
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
    <div className={`max-w-4xl mx-auto pt-10 ${utilsStyle.post}`}>
      <h1 className="mb-1 mt-0">{post.metaData.title}</h1>
      <span className="text-slate-400">{post.metaData.date?.toDateString()}</span>
      <article className="mt-10 text-slate-700" dangerouslySetInnerHTML={{ __html: post.content }}></article>
    </div>
  )
}
