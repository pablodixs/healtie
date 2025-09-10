import { css } from '../../../styled-system/css'

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>

export function Label(props: LabelProps) {
    return <label {...props} className={labelStyles} />
}

const labelStyles = css({
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '500',
    marginBottom: '0.25rem',
    color: 'gray',
})
