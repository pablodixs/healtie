import styles from './styles.module.css'

export function ProgressiveBlur({ style }: { style?: React.CSSProperties }) {
    return (
        <div className={styles.progressiveBlurContainer} style={style}>
            <div className={styles['blur-filter']}></div>
            <div className={styles['blur-filter']}></div>
            <div className={styles['blur-filter']}></div>
            <div className={styles['blur-filter']}></div>
            <div className={styles['blur-filter']}></div>
            <div className={styles['blur-filter']}></div>
            <div className={styles['blur-filter']}></div>
        </div>
    )
}
