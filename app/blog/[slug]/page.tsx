import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export default async function Page({ params }: { params: { slug: string } }) {
  const data = matter.read('./app/blog/(posts)/framework-and-pages.md')

  const processedContent = await remark().use(html).process(data.content)
  const contentHtml = processedContent.toString()
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: contentHtml,
      }}
    ></div>
  )
}
