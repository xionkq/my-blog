import Banner from '@/app/ui/banner'
import Image from 'next/image'
import { Icon } from '@iconify-icon/react'
import Label from '@/app/ui/label'
import { BlogLabel } from '@/app/lib/label'
import { getSortedPosts } from '@/app/lib/posts'

export default function Blog() {
  return (
    <>
      <Banner text={'THE BLOG'} />
      <BlogContent />
    </>
  )
}

function BlogContent() {
  console.log(getSortedPosts())
  return (
    <div className="mt-16 mb-8 px-8">
      <h2 className="text-2xl font-semibold">All blog posts</h2>
      <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 border-b pb-8 border-gray dark:border-gray-dark lg:grid-cols-3 md:grid-cols-2">
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </div>
  )
}

function BlogCard() {
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
