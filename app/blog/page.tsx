import Banner from '@/app/ui/banner'
import Image from 'next/image'
import { Icon } from '@iconify-icon/react'
import Label from '@/app/ui/label'
import { BlogLabel } from '@/app/lib/label'
import { getSortedPosts, PostMetaDataWithId } from '@/app/lib/posts'
import Link from 'next/link'

export default function Blog() {
  return (
    <>
      <Banner text={'THE BLOG'} />
      <BlogContent />
    </>
  )
}

function BlogContent() {
  const posts = getSortedPosts()
  return (
    <div className="mt-16 mb-8 px-8">
      <h2 className="text-2xl font-semibold">All blog posts</h2>
      <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 border-b pb-8 border-gray dark:border-gray-dark lg:grid-cols-3 md:grid-cols-2">
        {posts.map((post) => {
          return <BlogCard postMeta={post} key={post.id} />
        })}
        <BlogCardDemo />
      </div>
    </div>
  )
}

function BlogCard({ postMeta }: { postMeta: PostMetaDataWithId }) {
  const createTime = postMeta.date?.toLocaleString('zh-CN', { timeZone: 'UTC' })
  const title = postMeta.title
  const defaultExcerpt =
    'Like to know the secrets of transforming aLike to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?'
  const excerpt = postMeta.excerpt || defaultExcerpt
  const cover = postMeta.cover || '/blog-image.png'

  return (
    <div className="max-w-96 mx-auto w-full">
      <div className="w-full aspect-[16/10] relative">
        <Image
          src={cover}
          fill={true}
          style={{
            objectFit: 'cover',
          }}
          alt="img"
        />
      </div>
      <div className="mt-8">
        <p className="text-sm text-card-purple font-semibold">{createTime}</p>
        <Link className="mt-3 text-2xl font-semibold flex justify-between items-center" href={`/blog/${postMeta.id}`}>
          <div className="truncate" title={title}>
            {title}
          </div>
          <Icon className="text-2xl" icon="tdesign:arrow-right-up" />
        </Link>
        <p className="h-12 mt-3 text-card-gray line-clamp-2 dark:text-card-gray-dark">{excerpt}</p>
      </div>
      <div className="mt-6">
        <Label label={BlogLabel.LEADERSHIP} />
        <Label label={BlogLabel.MANAGEMENT} />
      </div>
    </div>
  )
}

function BlogCardDemo() {
  const createTime = 'Alec Whitten • 1 Jan 2023'
  const title = 'Bill Walsh leadership lessons'
  const intro = 'Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?'

  return (
    <div className="max-w-96 mx-auto">
      <div>
        <Image width={384} height={240} src="/blog-image.png" alt="img" />
      </div>
      <div className="mt-8">
        <p className="text-sm text-card-purple font-semibold">{createTime}</p>
        <h2 className="mt-3 text-2xl font-semibold flex justify-between items-center">
          {title}
          <Icon className="text-2xl" icon="tdesign:arrow-right-up" />
        </h2>
        <p className="mt-3 text-card-gray dark:text-card-gray-dark">{intro}</p>
      </div>
      <div className="mt-6">
        <Label label={BlogLabel.LEADERSHIP} />
        <Label label={BlogLabel.MANAGEMENT} />
      </div>
    </div>
  )
}
