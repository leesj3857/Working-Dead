import { useMemo, useState } from 'react'
import Icon from '@mdi/react'
import { mdiWeatherSunny, mdiWeatherNight, mdiPlus } from '@mdi/js'
import type { Period } from '../../../../api/type'
import {
    dateCalendarContainer,
    dateCalendarHeader,
    dateCalendarTitle,
    calendarBox,
    timeGrid,
    timeButton,
    timeButtonText,
    timeButtonSelectedLunch,
    timeButtonSelectedDinner,
    timeButtonTextSelectedLunch,
    timeButtonTextSelectedDinner,
    plusButton,
} from './DateCalendar.css'
import { primaryMain1, primarySub1, accent } from '../../../../style/color.css'

interface DateCalendarProps {
    period: Period
    selectedTime: string | null
    onSelectTime: (time: string) => void
}

const BASE_TIMES = [
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
]

export default function DateCalendar({ period, selectedTime, onSelectTime }: DateCalendarProps) {
    const [extraTimes, setExtraTimes] = useState<string[]>([])

    const isLunch = period === 'LUNCH'
    const headerColor = isLunch ? primaryMain1 : primarySub1

    const times = useMemo(() => {
        const all = [...BASE_TIMES, ...extraTimes]
        const toMinutes = (t: string) => {
            const [h, m] = t.split(':').map(Number)
            return h * 60 + m
        }
        return all.sort((a, b) => toMinutes(a) - toMinutes(b))
    }, [extraTimes])

    const parseAndNormalizeTime = (input: string): string | null => {
        const trimmed = input.trim()

        // HH:MM 또는 H:MM 형식
        const withColon = /^\d{1,2}:\d{2}$/
        if (withColon.test(trimmed)) {
            const [h, m] = trimmed.split(':').map(Number)
            if (h >= 0 && h <= 23 && m >= 0 && m <= 59) {
                return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
            }
            return null
        }

        // HHMM 또는 HMM 형식 (콜론 없음)
        const withoutColon = /^\d{3,4}$/
        if (withoutColon.test(trimmed)) {
            let h: number, m: number
            if (trimmed.length === 4) {
                h = parseInt(trimmed.slice(0, 2), 10)
                m = parseInt(trimmed.slice(2, 4), 10)
            } else {
                h = parseInt(trimmed.slice(0, 1), 10)
                m = parseInt(trimmed.slice(1, 3), 10)
            }
            if (h >= 0 && h <= 23 && m >= 0 && m <= 59) {
                return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
            }
        }
        return null
    }

    const handlePlusClick = () => {
        const value = window.prompt('추가할 시간을 입력하세요 (HH:MM 또는 HHMM)')
        if (!value) return

        const normalizedTime = parseAndNormalizeTime(value)
        if (!normalizedTime) {
            alert('HH:MM 또는 HHMM 형식으로 입력해주세요. (예: 11:30, 1130)')
            return
        }

        if (times.includes(normalizedTime)) {
            alert('이미 존재하는 시간입니다.')
            return
        }

        setExtraTimes(prev => [...prev, normalizedTime])
    }

    const lastIndex = times.length - 1
    const lastCol = (lastIndex % 3) + 1

    const getPlusGridColumn = () => {
        if (lastCol === 1) {
            return '2 / 4'
        }
        if (lastCol === 2) {
            return '3 / 4'
        }
        return '1 / 4'
    }

    return (
        <div className={dateCalendarContainer}>
            <div className={dateCalendarHeader}>
                <Icon
                    path={isLunch ? mdiWeatherSunny : mdiWeatherNight}
                    size={0.9}
                    color={headerColor}
                />
                <span className={dateCalendarTitle} style={{ color: headerColor }}>
                    {isLunch ? '점심' : '저녁'}
                </span>
            </div>
            <div className={calendarBox}>
                <div className={timeGrid}>
                    {times.map(time => {
                        const isSelected = selectedTime === time
                        return (
                            <button
                                key={time}
                                type="button"
                                className={`${timeButton} ${isSelected ? isLunch ? timeButtonSelectedLunch : timeButtonSelectedDinner : ''}`}
                                onClick={() => onSelectTime(time)}
                            >
                                <span
                                    className={`${timeButtonText} ${
                                        isSelected ? isLunch ? timeButtonTextSelectedLunch : timeButtonTextSelectedDinner : ''
                                    }`}
                                >
                                    {time}
                                </span>
                            </button>
                        )
                    })}
                    <button
                        type="button"
                        className={plusButton}
                        style={{ gridColumn: getPlusGridColumn() }}
                        onClick={handlePlusClick}
                    >
                        <Icon path={mdiPlus} size={1} color={accent} />
                    </button>
                </div>
            </div>
        </div>
    )
}

