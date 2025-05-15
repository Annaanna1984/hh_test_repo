import RatingBlock from "../../components/RatingBlock/RatingBlock";
import {useSelector} from 'react-redux';
import {RootState} from "../../store";
import {useDispatch} from 'react-redux';
import {setItemsCount, submitAnswers} from "../../store/answersSlice";
import styles from './SurveyPage.module.scss';
import {useEffect, useState} from "react";

const images = [
    {id: 0, src: '/images/cat.png', label: 'Kisik'},
    {id: 1, src: '/images/bread.png', label: 'Kotik'},
];

export default function SurveyPage() {
    const dispatch = useDispatch();
    const submitted = useSelector((s: RootState) => s.answers.submitted);
    const itemsTotal = useSelector((s: RootState) => s.answers.itemsCount)
    const drafts = useSelector((s: RootState) => s.answers.draft)
    const [nextEnabled, setNextEnabled] = useState(false)

    const handleNext = () => {
        dispatch(submitAnswers());
    };

    useEffect(() => {
        dispatch(setItemsCount(images.length))
    }, [dispatch])

    useEffect(() => {
        if (!drafts) return
        setNextEnabled(Object.keys(drafts).length === itemsTotal)
    }, [drafts, itemsTotal])

    useEffect(() => {
        if (submitted) {
            console.log('Отправлено:', submitted);
        }
    }, [submitted]);

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Оцените, пожалуйста, насколько вам нравится каждый из котиков?</h1>
            {images.map((item) => (
                <RatingBlock key={item.id} id={item.id} image={item.src}/>
            ))}
            <button disabled={!nextEnabled} className={`${styles.button} ${nextEnabled ? '' : styles.inactive}`} onClick={handleNext}>Далее</button>
        </div>
    );
}
