import type { MDXComponents } from 'mdx/types'
import { Button } from '@/components/Button'

const components: MDXComponents = {
    Button,
}

export function useMDXComponents(): MDXComponents {
    return components
}
