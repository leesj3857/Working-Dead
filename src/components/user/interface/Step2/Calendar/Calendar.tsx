import { useMemo, useRef } from 'react'
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
    mealSlotSelected,
    dateContainer
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
    setOrderList: React.Dispatch<React.SetStateAction<(MealSelection | null)[]>>
}

export default function Calendar({ startDate, endDate, selectedDates, setSelectedDates,setOrderList }: CalendarProps) {
    const weekdayHeaderRef = useRef<HTMLDivElement>(null)
    const dateContainerRef = useRef<HTMLDivElement>(null)
    
    const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    
    const handleScroll = () => {
        if (weekdayHeaderRef.current && dateContainerRef.current) {
            weekdayHeaderRef.current.scrollLeft = dateContainerRef.current.scrollLeft
        }
    }
    
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
    
    const toggleDate = (date: string) => {
        setSelectedDates(prev => {
            const hasLunch = prev.some(m => m.date === date && m.mealType === 'lunch')
            const hasDinner = prev.some(m => m.date === date && m.mealType === 'dinner')
            const hasBoth = hasLunch && hasDinner;

            if (hasBoth) {
                // 점심/저녁 둘 다 선택되어 있으면 둘 다 제거
                setOrderList(orderPrev =>
                    orderPrev.map(o =>
                        o && o.date === date ? null : o
                    )
                );
                return prev.filter(m => m.date !== date);
            } else if (!hasLunch && !hasDinner) {
                // 아무것도 선택 안 되어 있으면 둘 다 추가
                return [...prev, { date, mealType: 'lunch' }, { date, mealType: 'dinner' }];
            } else if (hasLunch && !hasDinner) {
                // 점심만 선택되어 있으면 저녁만 추가
                return [...prev, { date, mealType: 'dinner' }];
            } else if (!hasLunch && hasDinner) {
                // 저녁만 선택되어 있으면 점심만 추가
                return [...prev, { date, mealType: 'lunch' }];
            } else {
                // 그 외의 경우 변경 없음
                return prev;
            }
        });
    }
    
    const toggleMeal = (date: string, mealType: 'lunch' | 'dinner') => {
        setSelectedDates(prev => {
            const exists = prev.find(m => m.date === date && m.mealType === mealType)
            if (exists) {
                // selectedDates에서 제거할 때 orderList에서도 제거
                setOrderList(orderPrev => 
                    orderPrev.map(o => 
                        o && o.date === date && o.mealType === mealType ? null : o
                    )
                )
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
            <div className={weekdayHeader} ref={weekdayHeaderRef}>
                {weekdays.map((day, index) => (
                    <div key={index} className={weekdayLabel}>
                        {day}
                    </div>
                ))}
            </div>
            <div className={dateContainer} ref={dateContainerRef} onScroll={handleScroll}>
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
                                <div className={dateLabel} onClick={() => toggleDate(dateInfo.date)} style={{ cursor: 'pointer' }}>
                                    {dateInfo.date}
                                </div>
                                
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
            {/* 날짜 그리드 */}
        </div>
    )
}