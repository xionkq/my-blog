import Banner from "@/app/ui/banner";
import Image from 'next/image';

export default function Blog() {
  return (
    <>
      <Banner text={'THE BLOG'} />
      <BlogContent />
    </>
  )
}

function BlogContent() {
  return (
    <div className="mt-[60px]">
      <h2 className="text-2xl font-semibold">All blog posts</h2>
      <div className="mt-8 flex justify-between">
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </div>
  )
}

function BlogCard() {
  return (
    <div className="w-[384px]">
      <div>
        <Image width={384} height={240} src="/blog-image.png" alt="img"/>
      </div>
      <div className="mt-8">
        <p className="text-sm text-blog-card-purple font-semibold">Alec Whitten • 1 Jan 2023</p>
        <h2 className="mt-3 text-2xl font-semibold">Bill Walsh leadership lessons</h2>
        <p className="mt-3 text-blog-card-gray">Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?</p>
      </div>
      <div className="mt-6">
        <Label label={BlogLabel.LEADERSHIP} />
        <Label label={BlogLabel.MANAGEMENT} />
      </div>
    </div>
  )
}

enum BlogLabel {
  LEADERSHIP = 'Leadership',
  MANAGEMENT = 'Management',
}

const BlogLabelColor = {
  [BlogLabel.LEADERSHIP]: '#6941C6',
  [BlogLabel.MANAGEMENT]: '#363F72',
}

function Label({ label }: { label: BlogLabel }) {
  const color = `text-[${BlogLabelColor[label]}]`
  const bg = `bg-[${BlogLabelColor[label]}]/[.10]`
  return (
    <div className={`h-6 rounded-full px-2.5 inline-flex items-center font-medium ${color} ${bg}`}>
      {label}
    </div>
  )
}
