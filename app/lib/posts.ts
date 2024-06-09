import path from 'node:path'
import fs from 'fs'
import matter from 'gray-matter'
import { ErrorMessage } from '@/app/lib/error-message'
import { markdownToHtml } from '@/app/lib/utils'

interface PostMeta {
  content: string
  data: PostMetaData
}

export interface PostMetaData {
  title?: string
  excerpt?: string
  cover?: string
  date?: Date
  updated?: string
  hidden?: boolean
}

export interface PostMetaDataWithId extends PostMetaData {
  id: string
}

const postsDirectory = path.join(process.cwd(), 'app/blog/(posts)')

export function getSortedPosts(): PostMetaDataWithId[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData: (PostMetaDataWithId | null)[] = fileNames.map((file) => {
    const id = file.replace(/\.md$/, '')
    const matterResult = getPostMatterById(id)

    if (!matterResult) {
      return null
    } else {
      return {
        id,
        ...matterResult.data,
      }
    }
  })

  const postsMetaData = allPostsData.filter((item) => item !== null && !item.hidden) as PostMetaDataWithId[]

  return postsMetaData.sort((a, b) => {
    if (!a.date || !b.date) {
      return !b.date ? -1 : 1
    }
    return a.date < b.date ? 1 : -1
  })
}

function getPostMatterById(id: string): PostMeta | null {
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
    const matterResult = getPostMatterById(slug)
    if (!matterResult || matterResult.data.hidden) {
      throw ErrorMessage.ERROR_MESSAGE_NOT_FOUND
    }
    const processedContent = await markdownToHtml(matterResult.content)

    return {
      metaData: matterResult.data as PostMetaData,
      content: processedContent.toString(),
    }
  } catch (err) {
    console.error(err)
    return ErrorMessage.ERROR_MESSAGE_NOT_FOUND
  }
}
