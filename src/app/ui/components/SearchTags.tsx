import Link from 'next/link'
import { css } from '../../../../styled-system/css'
import {
    BandaidsIcon,
    FirstAidIcon,
    HospitalIcon,
    SyringeIcon,
} from '@phosphor-icons/react/dist/ssr'

export function SearchTags() {
    return (
        <div className={searchTagsContainer}>
            <Link href="#">
                <HospitalIcon /> Hospitais
            </Link>
            <Link href="#">
                <BandaidsIcon /> Pronto-socorro
            </Link>
            <Link href="#">
                <SyringeIcon /> Vacinação
            </Link>
            <Link href="#">
                <FirstAidIcon /> UBS
            </Link>
        </div>
    )
}

const searchTagsContainer = css({
    display: 'flex',
    gap: '.5rem',

    '& a': {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '.25rem',
        boxShadow: 'xs',
        borderRadius: 'full',
        backgroundColor: 'white',
        padding: '.75rem 1rem',
        border: '1px solid',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        fontSize: '0.875rem',
        fontWeight: 450,
        color: 'primary',
        lineHeight: '0.875rem',
        transition: 'all cubic-bezier(0,1.5,1,1.5) 150ms',

        _hover: {
            backgroundColor: 'background',
            scale: '1.05',
        },
    },
})
