import { Heading } from '@/components/Typography'
import { getAllPosts } from '@/lib/mdx'
import { PostLink } from './components/post-link'
import { css } from '../../../styled-system/css'

export default function Blog() {
    const posts = getAllPosts()

    return (
        <div>
            <Heading>Últimas notícias</Heading>
            <section
                className={css({
                    marginY: '2rem',
                })}
            >
                <ul
                    className={css({
                        display: 'grid',
                        gridTemplateColumns:
                            'repeat(auto-fill, minmax(250px, 1fr))',
                        gap: '2rem',
                    })}
                >
                    {posts.map((post) => (
                        <li key={post.slug}>
                            <PostLink post={post} />
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    )
}
