import { descriptionTitle, descriptionDescription, descriptionContainer, descriptionTitleContainer, descriptionTabDateButton, descriptionTabPriorityButton } from './Description.css'
import Icon from '@mdi/react'
import { mdiCertificate, mdiCalendarCheck } from '@mdi/js'
import { accent } from '../../../../style/color.css'
export default function Description({title, description, currentTab = 'priority', onChangeTab}: {title: string, description: string, currentTab: 'priority' | 'time', onChangeTab: (tab: 'priority' | 'time') => void}) {
    return (
        <div className={descriptionContainer}>
            <div className={descriptionTitleContainer}>
                <span className={descriptionTitle}>{title}</span>
                {currentTab === 'priority' && (
                    <button type="button" className={descriptionTabDateButton} onClick={() => onChangeTab('time')}>
                        <Icon path={mdiCalendarCheck} size={0.8}/>
                        날짜 설정
                    </button>
                )}
                {currentTab === 'time' && (
                    <button type="button" className={descriptionTabPriorityButton} onClick={() => onChangeTab('priority')}>
                        <Icon path={mdiCalendarCheck} size={0.8}/>
                        우선순위 설정
                    </button>
                )}
            </div>
            <span className={descriptionDescription}>{description}</span>
        </div>
    )
}