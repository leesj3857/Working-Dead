import { useState, useRef, useCallback, useEffect } from 'react'
import Icon from '@mdi/react'
import { mdiChevronLeft, mdiChevronRight, mdiChevronDown } from '@mdi/js'
import { 
    dateContainer, 
    dateTitle, 
    dateDescription, 
    dateTitleContainer,
    calendar,
    calendarHeader,
    monthSelector,
    monthText,
    arrowButton,
    calendarGrid,
    weekdayRow,
    weekday,
    dateCell,
    dateCellText,
    dateCellInRange,
    dateCellRangeStart,
    dateCellRangeEnd,
    monthDropdown,
    monthOption,
    monthOptionSelected
} from './SetDate.css'
import { subtle1 } from '../../../../../style/color.css'

export default function SetDate({ startDate, setStartDate, endDate, setEndDate }: { startDate: Date | null, setStartDate: (startDate: Date | null) => void, endDate: Date | null, setEndDate: (endDate: Date | null) => void }) {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [isMonthSelectorOpen, setIsMonthSelectorOpen] = useState(false)
    
    // 무한 스크롤을 위한 년도 범위
    const currentYear = new Date().getFullYear()
    const [yearRange, setYearRange] = useState({ start: currentYear, end: currentYear + 2 })
    const dropdownRef = useRef<HTMLDivElement>(null)

    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // 현재 달이 오늘이 속한 달인지 확인
    const isCurrentMonth = year === today.getFullYear() && month === today.getMonth()
    
    // 달력 시작 날짜 결정 (오늘이 속한 달이면 오늘부터, 아니면 1일부터)
    let startDay = 1
    if (isCurrentMonth) {
        startDay = today.getDate()
    }
    
    const firstDay = new Date(year, month, startDay)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    
    // Monday를 0으로 시작 (0=Mon, 6=Sun)
    let firstDayOfWeek = firstDay.getDay() - 1
    if (firstDayOfWeek === -1) firstDayOfWeek = 6

    const handlePrevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1))
    }

    const handleNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1))
    }

    const handleDateClick = (day: number, monthOffset: number = 0) => {
        const clickedDate = new Date(year, month + monthOffset, day)
        clickedDate.setHours(0, 0, 0, 0)

        if (clickedDate < today) return // 과거 날짜는 선택 불가

        if (!startDate || (startDate && endDate)) {
            // 새로운 범위 시작
            setStartDate(clickedDate)
            setEndDate(null)
        } else {
            // 범위 끝 선택
            if (clickedDate < startDate) {
                setEndDate(startDate)
                setStartDate(clickedDate)
            } else {
                setEndDate(clickedDate)
            }
        }
    }

    const isInRange = (day: number, monthOffset: number = 0) => {
        if (!startDate) return false
        const date = new Date(year, month + monthOffset, day)
        date.setHours(0, 0, 0, 0)
        
        // endDate가 없으면 startDate만 선택된 상태 (년월일만 비교)
        if (!endDate) {
            return date.getFullYear() === startDate.getFullYear() &&
                   date.getMonth() === startDate.getMonth() &&
                   date.getDate() === startDate.getDate()
        }
        
        // 범위 비교를 위해 startDate와 endDate도 시간 정규화
        const normalizedStart = new Date(startDate)
        normalizedStart.setHours(0, 0, 0, 0)
        const normalizedEnd = new Date(endDate)
        normalizedEnd.setHours(0, 0, 0, 0)
        
        return date >= normalizedStart && date <= normalizedEnd
    }

    const isRangeStart = (day: number, monthOffset: number = 0) => {
        if (!startDate) return false
        const date = new Date(year, month + monthOffset, day)
        
        // 년월일만 비교
        const isStart = date.getFullYear() === startDate.getFullYear() &&
                       date.getMonth() === startDate.getMonth() &&
                       date.getDate() === startDate.getDate()
        
        // endDate가 없으면 startDate도 시작이자 끝
        if (!endDate && isStart) return true
        
        return isStart
    }

    const isRangeEnd = (day: number, monthOffset: number = 0) => {
        if (!startDate) return false
        const date = new Date(year, month + monthOffset, day)
        
        // endDate가 없으면 startDate가 끝
        if (!endDate) {
            return date.getFullYear() === startDate.getFullYear() &&
                   date.getMonth() === startDate.getMonth() &&
                   date.getDate() === startDate.getDate()
        }
        
        // 년월일만 비교
        return date.getFullYear() === endDate.getFullYear() &&
               date.getMonth() === endDate.getMonth() &&
               date.getDate() === endDate.getDate()
    }

    const isPastDate = (day: number, monthOffset: number = 0) => {
        const date = new Date(year, month + monthOffset, day)
        date.setHours(0, 0, 0, 0)
        return date < today
    }

    const handleMonthSelect = (selectedYear: number, selectedMonth: number) => {
        setCurrentDate(new Date(selectedYear, selectedMonth, 1))
        setIsMonthSelectorOpen(false)
    }

    const toggleMonthSelector = () => {
        setIsMonthSelectorOpen(!isMonthSelectorOpen)
        if (!isMonthSelectorOpen) {
            // 드롭다운이 열릴 때 현재 년도를 중심으로 범위 초기화
            setYearRange({ start: currentYear, end: currentYear + 2 })
        }
    }

    // 무한 스크롤 핸들러
    const handleScroll = useCallback(() => {
        if (!dropdownRef.current) return

        const { scrollTop, scrollHeight, clientHeight } = dropdownRef.current
        
        // 하단 근처에 도달하면 미래 년도 추가
        if (scrollTop + clientHeight >= scrollHeight - 50) {
            setYearRange(prev => ({ ...prev, end: prev.end + 1 }))
        }
        
        // 상단 근처에 도달하면 과거 년도 추가 (현재 년도까지만)
        if (scrollTop <= 50 && yearRange.start > currentYear) {
            const dropdown = dropdownRef.current
            const previousScrollHeight = dropdown.scrollHeight
            
            setYearRange(prev => ({ ...prev, start: prev.start - 1 }))
            
            // 스크롤 위치 유지
            setTimeout(() => {
                if (dropdown) {
                    const newScrollHeight = dropdown.scrollHeight
                    dropdown.scrollTop = scrollTop + (newScrollHeight - previousScrollHeight)
                }
            }, 0)
        }
    }, [yearRange.start, currentYear])

    // 스크롤 이벤트 리스너
    useEffect(() => {
        const dropdown = dropdownRef.current
        if (dropdown && isMonthSelectorOpen) {
            dropdown.addEventListener('scroll', handleScroll)
            return () => dropdown.removeEventListener('scroll', handleScroll)
        }
    }, [handleScroll, isMonthSelectorOpen])

    // 이전 달의 날짜들
    const prevMonthDays = []
    const prevMonthLastDay = new Date(year, month, 0).getDate()
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        prevMonthDays.push(prevMonthLastDay - i)
    }

    // 현재 달의 날짜들 (오늘이 속한 달이면 오늘부터, 아니면 1일부터)
    const currentMonthDays = []
    for (let i = startDay; i <= daysInMonth; i++) {
        currentMonthDays.push(i)
    }

    // 다음 달의 날짜들 (5주 완성을 위해)
    const totalCells = prevMonthDays.length + currentMonthDays.length
    const nextMonthDays = []
    const remainingCells = 35 - totalCells // 5주 * 7일
    for (let i = 1; i <= remainingCells; i++) {
        nextMonthDays.push(i)
    }

    return (
        <div className={dateContainer}>
            <div className={dateTitleContainer}>
                <span className={dateTitle}>날짜 범위</span>
            </div>
            <span className={dateDescription}>원하는 약속 날짜의 범위를 선택해주세요.</span>
            
            <div className={calendar}>
                <div className={calendarHeader}>
                    <button className={arrowButton} onClick={handlePrevMonth}>
                        <Icon path={mdiChevronLeft} size={1} color="#FFFFFF" />
                    </button>
                    <div className={monthSelector} onClick={toggleMonthSelector}>
                        <span className={monthText}>{months[month]} {year}</span>
                        <Icon path={mdiChevronDown} size={0.8} color={subtle1} />
                    </div>
                    {isMonthSelectorOpen && (
                        <div className={monthDropdown} ref={dropdownRef}>
                            {Array.from({ length: yearRange.end - yearRange.start + 1 }, (_, yearIndex) => {
                                const displayYear = yearRange.start + yearIndex
                                return months.map((monthName, monthIndex) => {
                                    const isSelected = displayYear === year && monthIndex === month
                                    const isPast = displayYear < currentYear || 
                                                   (displayYear === currentYear && monthIndex < new Date().getMonth())
                                    
                                    // 과거 날짜는 렌더링하지 않음
                                    if (isPast) return null
                                    
                                    return (
                                        <div
                                            key={`${displayYear}-${monthIndex}`}
                                            data-year-month={`${displayYear}-${monthIndex}`}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleMonthSelect(displayYear, monthIndex)
                                            }}
                                            className={isSelected ? `${monthOption} ${monthOptionSelected}` : monthOption}
                                            style={{
                                                backgroundColor: isSelected ? '#CEFAFE' : undefined
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!isSelected) {
                                                    e.currentTarget.style.backgroundColor = '#F5F5F5'
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isSelected) {
                                                    e.currentTarget.style.backgroundColor = '#FFFFFF'
                                                }
                                            }}
                                        >
                                            {monthName} {displayYear}
                                        </div>
                                    )
                                })
                            })}
                        </div>
                    )}
                    <button className={arrowButton} onClick={handleNextMonth}>
                        <Icon path={mdiChevronRight} size={1} color="#FFFFFF" />
                    </button>
                </div>

                <div className={calendarGrid}>
                    <div className={weekdayRow}>
                        {weekdays.map(day => (
                            <div key={day} className={weekday}>{day}</div>
                        ))}
                    </div>

                    {/* 이전 달 날짜 */}
                    {prevMonthDays.map((day, index) => {
                        const inRange = isInRange(day, -1)
                        const rangeStart = isRangeStart(day, -1)
                        const rangeEnd = isRangeEnd(day, -1)
                        const past = isPastDate(day, -1)

                        let cellClass = dateCell
                        if (inRange) cellClass += ` ${dateCellInRange}`
                        if (rangeStart) cellClass += ` ${dateCellRangeStart}`
                        if (rangeEnd) cellClass += ` ${dateCellRangeEnd}`

                        return (
                            <div 
                                key={`prev-${index}`} 
                                className={cellClass}
                                onClick={() => handleDateClick(day, -1)}
                                style={{ 
                                    cursor: past ? 'not-allowed' : 'pointer', 
                                    opacity: inRange ? 1 : 0.5 
                                }}
                            >
                                <span 
                                    className={dateCellText}
                                    style={{ 
                                        color: inRange ? '#19191B' : '#6E6A68'
                                    }}
                                >
                                    {day}
                                </span>
                            </div>
                        )
                    })}

                    {/* 현재 달 날짜 */}
                    {currentMonthDays.map(day => {
                        const inRange = isInRange(day)
                        const rangeStart = isRangeStart(day)
                        const rangeEnd = isRangeEnd(day)
                        const past = isPastDate(day)

                        let cellClass = dateCell
                        if (inRange) cellClass += ` ${dateCellInRange}`
                        if (rangeStart) cellClass += ` ${dateCellRangeStart}`
                        if (rangeEnd) cellClass += ` ${dateCellRangeEnd}`

                        return (
                            <div 
                                key={day} 
                                className={cellClass}
                                onClick={() => handleDateClick(day)}
                                style={{ cursor: past ? 'not-allowed' : 'pointer' }}
                            >
                                <span 
                                    className={dateCellText}
                                    style={{ 
                                        color: past ? '#6E6A68' : inRange ? '#19191B' : '#DBD8D3'
                                    }}
                                >
                                    {day}
                                </span>
                            </div>
                        )
                    })}

                    {/* 다음 달 날짜 */}
                    {nextMonthDays.map((day, index) => {
                        const inRange = isInRange(day, 1)
                        const rangeStart = isRangeStart(day, 1)
                        const rangeEnd = isRangeEnd(day, 1)
                        const past = isPastDate(day, 1)

                        let cellClass = dateCell
                        if (inRange) cellClass += ` ${dateCellInRange}`
                        if (rangeStart) cellClass += ` ${dateCellRangeStart}`
                        if (rangeEnd) cellClass += ` ${dateCellRangeEnd}`

                        return (
                            <div 
                                key={`next-${index}`} 
                                className={cellClass}
                                onClick={() => handleDateClick(day, 1)}
                                style={{ 
                                    cursor: past ? 'not-allowed' : 'pointer', 
                                    opacity: inRange ? 1 : 0.5 
                                }}
                            >
                                <span 
                                    className={dateCellText}
                                    style={{ 
                                        color: inRange ? '#19191B' : '#6E6A68'
                                    }}
                                >
                                    {day}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

