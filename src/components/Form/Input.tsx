import { css } from '../../../styled-system/css'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export function Input(props: InputProps) {
    return <input {...props} className={inputStyles} />
}

const inputStyles = css({
    padding: '0.5rem 0.75rem',
    borderRadius: '12px',
    border: '1px solid',
    borderColor: 'neutral.50',
    fontSize: '1rem',
    lineHeight: '1.5rem',
    transition: 'all 0.2s ease-in-out',
    marginBottom: '1rem',
    backgroundColor: 'neutral.50',

    _focus: {
        borderColor: 'tint',
        outline: 'none',
        backgroundColor: 'white',
    },
})
