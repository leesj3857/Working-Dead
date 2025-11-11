import { topNav, topNavEditing, topNavIcon, topNavAdminText, topNavBackText } from './TopNav.css'
import Icon from '@mdi/react';
import { mdiAccountGroupOutline } from '@mdi/js';
import { accent } from '../../../../style/color.css';

export default function TopNav({ step, setStep }: { step: number, setStep: (step: number) => void }) {
    const handleBackClick = () => {
        setStep(step - 1)
    }
    return (
        <div className={step > 0 ? topNav : topNav + ' ' + topNavEditing}>
            {step === 0 ? (
                <>
                    <Icon path={mdiAccountGroupOutline} size={1} className={topNavIcon} color={accent} />
                    <span className={topNavAdminText}>약속을 간편하게 잡아보세요</span>
                </>
            ) : (
                <>
                    <img src="/back.png" alt="Back Icon" className={topNavIcon} onClick={handleBackClick} />
                </>
            )}
        </div>
    )
}