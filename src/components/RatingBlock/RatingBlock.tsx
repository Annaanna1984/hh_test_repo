import Stars from "../Stars/Stars";
import {useDispatch, useSelector} from 'react-redux';
import {markUnsure, setAnswer} from "../../store/answersSlice";
import {RootState} from '../../store';
import styles from './RatingBlock.module.scss';

type Props = { id: number; image: string };

export default function RatingBlock({id, image}: Props) {
    const dispatch = useDispatch();
    const value = useSelector((s: RootState) => s.answers.draft[id] ?? null);
    const unsurePressed = useSelector((s: RootState) => s.answers.unsureFlags[id]);

    return (
        <div className={styles.block}>
            <img className={styles.image} src={image} width={100} alt=""/>
            <div className={styles.info}>
                <Stars value={value} onRate={(val) => dispatch(setAnswer({id, value: val}))}/>
                <button
                    className={`${styles.button} ${unsurePressed ? styles.pressed : ''}`}
                    onClick={() => dispatch(markUnsure(id))}
                >
                    Затрудняюсь
                </button>
            </div>
        </div>
    );
}
