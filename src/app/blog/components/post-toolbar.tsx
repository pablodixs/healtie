import { Button } from '@/components/Button'
import { Divider } from '@/components/Divider'
import { LinkIcon } from '@phosphor-icons/react/dist/ssr'

export function PostToolbar() {
    return (
        <>
            <Divider />
            <Button variant="text">
                <LinkIcon /> Compartilhar
            </Button>
        </>
    )
}
