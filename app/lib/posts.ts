import path from 'node:path'
import fs from 'fs'

export function getPosts() {
  const postsDirectory = path.join(process.cwd(), 'app/blog/(posts)')
  console.log('postsDirectory', postsDirectory)
  const fileNames = fs.readdirSync(postsDirectory)
  console.log(fileNames)
}
