import styles from './Stars.module.scss';

type Props = {
    value: number | null;
    onRate: (val: number) => void;
};

export default function Stars({value, onRate}: Props) {
    return (
        <div className={styles.stars}>
            {Array.from({length: 10}, (_, i) => (
                <span
                    key={i}
                    className={`${styles.star} ${value && i + 1 <= value ? styles.active : ''}`}
                    onClick={() => onRate(i + 1)}
                >
            ★
                </span>
            ))}
            <span className={styles.label}>{value ?? '0'}</span>
        </div>
    );
}
