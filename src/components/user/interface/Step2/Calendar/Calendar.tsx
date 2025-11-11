import { useMemo } from 'react'
import { 
    calendarContainer, 
    weekdayHeader, 
    weekdayLabel, 
    datesGrid, 
    dateColumn,
    emptyBox,
    dateLabel,
    mealSlot,
    mealSlotLunch,
    mealSlotDinner,
    mealSlotSelected
} from './Calendar.css'
import Icon from '@mdi/react'
import { mdiWeatherSunny, mdiWeatherNight } from '@mdi/js'
import { accent } from '../../../../../style/color.css'

interface MealSelection {
    date: string
    mealType: 'lunch' | 'dinner'
}

interface CalendarProps {
    startDate: Date
    endDate: Date
    selectedDates: MealSelection[]
    setSelectedDates: React.Dispatch<React.SetStateAction<MealSelection[]>>
}

export default function Calendar({ startDate, endDate, selectedDates, setSelectedDates }: CalendarProps) {

    
    const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    
    // 날짜 범위를 기반으로 dates 배열 생성
    const dates = useMemo(() => {
        const result: { date: string, day: string, dateObj: Date | null, isEmpty: boolean }[] = []
        const current = new Date(startDate)
        const end = new Date(endDate)
        
        // 시작 날짜의 요일 인덱스 (0 = 일요일)
        const startDayOfWeek = current.getDay()
        
        // 첫 주 시작 전 빈칸 추가
        for (let i = 0; i < startDayOfWeek; i++) {
            result.push({
                date: '',
                day: '',
                dateObj: null,
                isEmpty: true
            })
        }
        
        // 실제 날짜 추가
        while (current <= end) {
            const month = current.getMonth() + 1
            const day = current.getDate()
            const weekdayIndex = current.getDay()
            
            result.push({
                date: `${month}/${day}`,
                day: weekdays[weekdayIndex],
                dateObj: new Date(current),
                isEmpty: false
            })
            
            current.setDate(current.getDate() + 1)
        }
        
        return result
    }, [startDate, endDate])
    
    const toggleMeal = (date: string, mealType: 'lunch' | 'dinner') => {
        setSelectedDates(prev => {
            const exists = prev.find(m => m.date === date && m.mealType === mealType)
            if (exists) {
                return prev.filter(m => !(m.date === date && m.mealType === mealType))
            } else {
                return [...prev, { date, mealType }]
            }
        })
    }
    
    const isMealSelected = (date: string, mealType: 'lunch' | 'dinner') => {
        return selectedDates.some(m => m.date === date && m.mealType === mealType)
    }
    
    return (
        <div className={calendarContainer}>
            {/* 요일 헤더 */}
            <div className={weekdayHeader}>
                {weekdays.map((day, index) => (
                    <div key={index} className={weekdayLabel}>
                        {day}
                    </div>
                ))}
            </div>
            
            {/* 날짜 그리드 */}
            <div className={datesGrid}>
                {dates.map((dateInfo, index) => {
                    // 빈 칸인 경우
                    if (dateInfo.isEmpty) {
                        return (
                            <div key={`empty-${index}`} className={dateColumn}>
                                <div className={emptyBox}></div>
                            </div>
                        )
                    }
                    
                    const lunchSelected = isMealSelected(dateInfo.date, 'lunch')
                    const dinnerSelected = isMealSelected(dateInfo.date, 'dinner')
                    
                    return (
                        <div key={dateInfo.date} className={dateColumn}>
                            {/* 날짜 */}
                            <div className={dateLabel}>{dateInfo.date}</div>
                            
                            {/* 점심 */}
                            <div 
                                className={`${mealSlot} ${mealSlotLunch} ${lunchSelected ? mealSlotSelected : ''}`}
                                onClick={() => toggleMeal(dateInfo.date, 'lunch')}
                                style={lunchSelected ? {} : {}}
                            >
                                <Icon 
                                    path={mdiWeatherSunny} 
                                    size={0.7} 
                                    color={lunchSelected ? '#FFFFFF' : accent}
                                />
                                <span style={{ color: lunchSelected ? '#FFFFFF' : accent }}>점심</span>
                            </div>
                            
                            {/* 저녁 */}
                            <div 
                                className={`${mealSlot} ${mealSlotDinner} ${dinnerSelected ? mealSlotSelected : ''}`}
                                onClick={() => toggleMeal(dateInfo.date, 'dinner')}
                                style={dinnerSelected ? {} : {}}
                            >
                                <Icon 
                                    path={mdiWeatherNight} 
                                    size={0.7} 
                                    color={dinnerSelected ? '#FFFFFF' : accent}
                                />
                                <span style={{ color: dinnerSelected ? '#FFFFFF' : accent }}>저녁</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}