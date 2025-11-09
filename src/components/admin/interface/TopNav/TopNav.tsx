import { topNav, topNavEditing, topNavIcon, topNavAdminText, topNavBackText } from './TopNav.css'

export default function TopNav({ isEditing, setIsEditing }: { isEditing: boolean, setIsEditing: (isEditing: boolean) => void }) {
    const handleBackClick = () => {
        setIsEditing(false)
    }
    return (
        <div className={isEditing ? topNav : topNav + ' ' + topNavEditing}>
            {!isEditing ? (
                <>
                    <img src="/lock.png" alt="Lock Icon" className={topNavIcon} />
                    <span className={topNavAdminText}>ADMIN</span>
                </>
            ) : (
                <>
                    <img src="/back.png" alt="Back Icon" className={topNavIcon} onClick={handleBackClick} />
                    <span className={topNavBackText} onClick={handleBackClick}>Go Back</span>
                </>
            )}
        </div>
    )
}