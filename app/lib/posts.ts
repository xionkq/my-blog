import path from 'node:path'
import fs from 'fs'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { ErrorMessage } from '@/app/lib/error-message'

interface PostMeta {
  content: string
  data: PostMetaData
}

interface PostMetaData {
  title?: string
  date?: Date
  updated?: string
}

const postsDirectory = path.join(process.cwd(), 'app/blog/(posts)')

export function getSortedPosts() {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData: (PostMetaData | null)[] = fileNames.map((file) => {
    const id = file.replace(/\.md$/, '')
    const matterResult = getPotMatterById(id)

    if (!matterResult) {
      return null
    } else {
      return {
        ...matterResult.data,
      }
    }
  })

  return allPostsData
    .filter((item) => item !== null)
    .sort((a, b) => {
      if (!a.date || !b.date) {
        return !b.date ? -1 : 1
      }

      return a.date < b.date ? 1 : -1
    })
}

export function getPotMatterById(id: string): PostMeta | null {
  try {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    return matter.read(fullPath) as PostMeta
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function getPostInfoBySlug(slug: string) {
  try {
    const matterResult = getPotMatterById(slug)
    if (!matterResult) {
      throw ErrorMessage.ERROR_MESSAGE_NOT_FOUND
    }
    const processedContent = await remark().use(html).process(matterResult.content)

    return {
      metaData: matterResult.data as PostMetaData,
      content: processedContent.toString(),
    }
  } catch (err) {
    console.error(err)
    return ErrorMessage.ERROR_MESSAGE_NOT_FOUND
  }
}
