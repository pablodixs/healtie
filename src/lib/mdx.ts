import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const POSTS_PATH = path.join(process.cwd(), 'src/content/blog/')

export function getAllPosts() {
    return fs.readdirSync(POSTS_PATH).map((file) => {
        const slug = file.replace(/\.mdx$/, '')
        const content = fs.readFileSync(path.join(POSTS_PATH, file), 'utf-8')

        const { data } = matter(content)

        return {
            slug,
            title: data.title,
            date: data.date,
            category: data.category,
            ...data,
        }
    })
}

export function getPostBySlug(slug: string) {
    const filePath = path.join(POSTS_PATH, `${slug}.mdx`)
    const fileContent = fs.readFileSync(filePath, 'utf-8')

    return matter(fileContent)
}
