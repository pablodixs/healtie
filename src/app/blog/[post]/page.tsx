import { getPostBySlug, getAllPosts } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import { css } from '../../../../styled-system/css'
import { Paragraph, Subheading } from '@/components/Typography'
import { PostToolbar } from '../components/post-toolbar'
import { PostImage } from '../components/post-image'

const mdxComponents = {
    PostToolbar,
    PostImage,
}

type Props = {
    params: {
        slug: string
    }
}

export async function generateMetadata({ params }: Props) {
    if (!params.slug) {
        return {}
    }

    const { data } = getPostBySlug(params.slug)

    if (!data) {
        return {}
    }

    return {
        title: data.title,
        description: data.description,
        openGraph: {
            title: data.title,
            description: data.description,
            type: 'article',
        },
    }
}

export async function generateStaticParams() {
    return getAllPosts().map((post) => ({
        post: post.slug,
    }))
}

export default async function BlogPost({
    params,
}: {
    params: Promise<{ post?: string; slug?: string }>
}) {
    const resolvedParams = await params
    const slug = resolvedParams.post ?? resolvedParams.slug

    if (!slug) {
        return notFound()
    }

    const { content, data: post } = getPostBySlug(slug)

    return (
        <div className={wrapper}>
            <section
                className={css({
                    display: 'flex',
                    gap: '2rem',
                    justifyContent: 'center',
                })}
            >
                <Paragraph size="caption" subtle>
                    {new Date(post.date).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                    })}
                </Paragraph>
                <Paragraph size="caption">{post.category}</Paragraph>
            </section>
            <article>
                <Subheading size="lg" centered style={{ margin: '2rem 0' }}>
                    {post.title}
                </Subheading>
                <Paragraph
                    centered
                    size="subheadline"
                    style={{ marginBottom: '2rem' }}
                >
                    {post.description}
                </Paragraph>
                <section className={article}>
                    <MDXRemote source={content} components={mdxComponents} />
                </section>
                <PostToolbar />
            </article>
        </div>
    )
}

const wrapper = css({
    maxWidth: '800px',
    marginX: 'auto',
})

const article = css({
    '& h1': {
        display: 'none',
    },

    '& p': {
        fontSize: '1rem',
        color: 'primary',
        lineHeight: 'normal',
        margin: '.75rem 0',
        textWrap: 'pretty',

        '& strong': {
            fontWeight: 550,
        },
    },

    '& h2': {
        fontSize: {
            md: '1.875rem',
            base: '1.5rem',
        },
        color: '#151515',
        fontWeight: 500,
        lineHeight: 'tight',
        letterSpacing: 'tight',
        textWrap: 'balance',
        mb: '2rem',
        mt: '4rem',
    },

    '& img': {
        borderRadius: '12px',
        boxShadow: '0 0 0 -1px rgba(0, 0, 0, 0.1)',
    },
})
