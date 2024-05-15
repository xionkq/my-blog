// TODO: add more default styles
import utilsStyle from '@/app/ui/utils.module.css'
import NotFound from '@/app/not-found'
import { getPostInfoBySlug } from '@/app/lib/posts'
import { ErrorMessage } from '@/app/lib/error-message'

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPostInfoBySlug(params.slug)

  if (post === ErrorMessage.ERROR_MESSAGE_NOT_FOUND) {
    return <NotFound />
  }

  return (
    <article className={utilsStyle.post}>
      <h2>{post.metaData.title}</h2>
      <p>{post.metaData.date?.toString()}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
    </article>
  )
}
