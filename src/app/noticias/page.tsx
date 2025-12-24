import { getAllPosts } from '@/lib/mdx'
import { PostLink } from './components/post-link'
import { css } from '../../../styled-system/css'
import { NewsroomHeader } from './components/newsroom-header'
import { Subheading } from '@/components/Typography'

export default function Blog() {
    const posts = getAllPosts()

    return (
        <>
            <NewsroomHeader />
            <section
                className={css({
                    marginY: '2rem',
                })}
            >
                <Subheading>Últimas notícias</Subheading>
                <ul
                    className={css({
                        mt: '1rem',
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
        </>
    )
}
