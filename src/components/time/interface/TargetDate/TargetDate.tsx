import Icon from '@mdi/react'
import { mdiLicense, mdiWeatherSunny, mdiWeatherNight } from '@mdi/js'
import type { Period } from '../../../../api/type'
import {
    targetDateContainer,
    targetDateRow,
    targetDateInfo,
    targetDateTitle,
    badgeContainer,
    badgeLunch,
    badgeDinner,
    badgeTextLunch,
    badgeTextDinner,
    descriptionText,
} from './TargetDate.css'
import { primaryMain1, primarySub1, subtle1 } from '../../../../style/color.css'

interface TargetDateProps {
    period: Period
    dateLabel?: string
}

export default function TargetDate({ period, dateLabel }: TargetDateProps) {
    const isLunch = period === 'LUNCH'

    return (
        <div className={targetDateContainer}>
            <div className={targetDateRow}>
                <div className={targetDateInfo}>
                    <Icon path={mdiLicense} size={1.4} color={subtle1} />
                    <span className={targetDateTitle}>{dateLabel ?? '일시 미정'}</span>
                </div>
                <div
                    className={`${badgeContainer} ${isLunch ? badgeLunch : badgeDinner}`}
                    style={{ marginLeft: '10px' }}
                >
                    <Icon
                        path={isLunch ? mdiWeatherSunny : mdiWeatherNight}
                        size={0.8}
                        color={isLunch ? primaryMain1 : primarySub1}
                    />
                    <span className={isLunch ? badgeTextLunch : badgeTextDinner}>
                        {isLunch ? '점심' : '저녁'}
                    </span>
                </div>
            </div>
            <span className={descriptionText}>가장 선호하는 시간 하나를 선택해주세요</span>
        </div>
    )
}

