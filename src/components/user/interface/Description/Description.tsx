import { descriptionTitle, descriptionDescription, descriptionContainer } from './Description.css'
export default function Description({title, description}: {title: string, description: string}) {
    return (
        <div className={descriptionContainer}>
            <span className={descriptionTitle}>{title}</span>
            <span className={descriptionDescription}>{description}</span>
        </div>
    )
}