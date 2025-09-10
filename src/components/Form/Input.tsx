import { css } from '../../../styled-system/css'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export function Input(props: InputProps) {
    return <input {...props} className={inputStyles} />
}

const inputStyles = css({
    padding: '0.5rem 0.75rem',
    borderRadius: 'full',
    border: '1px solid',
    borderColor: 'gray.300',
    fontSize: '1rem',
    lineHeight: '1.5rem',
    transition: 'all 0.2s ease-in-out',
    marginBottom: '1rem',
    backgroundColor: 'background',

    _focus: {
        borderColor: 'tint',
        outline: 'none',
        backgroundColor: 'white',
    },
})
