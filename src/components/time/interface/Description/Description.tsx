import { descriptionTitle, descriptionContainer } from './Description.css'
export default function Description({title}: {title: string}) {
    return (
        <div className={descriptionContainer}>
            <span className={descriptionTitle}>{title}</span>
        </div>
    )
}