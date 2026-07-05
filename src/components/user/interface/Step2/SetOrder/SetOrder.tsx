import { useRef, useState, useEffect } from 'react'
import { setOrderContainer, setOrderCollapsed, setOrderExpanded, orderTitle,
    orderDescription, orderTitleContainer, priorityList, priorityItem,
    priorityNumber, prioritySlot, divider, datesList, dateChip,
    dateChipSelected, dateText, orderHighlight, orderStar, sheetHandle } from './SetOrder.css'
import Icon from '@mdi/react'
import { mdiWeatherSunny, mdiWeatherNight } from '@mdi/js'
import { subtle1 } from '../../../../../style/color.css'
import type { Period } from '../../../../../api/type'

interface MealSelection {
    date: string
    period: Period
}

interface SetOrderProps {
    selectedDates: MealSelection[]
    orderList: (MealSelection | null)[]
    setOrderList: React.Dispatch<React.SetStateAction<(MealSelection | null)[]>>
    collapsed?: boolean
    containerRef?: React.Ref<HTMLDivElement>
    onExpand?: () => void
    onCollapse?: () => void
}

export default function SetOrder({ selectedDates, orderList, setOrderList, collapsed = false, containerRef, onExpand, onCollapse }: SetOrderProps) {
    const touchStartY = useRef<number | null>(null)
    const didDrag = useRef(false)
    const settleTimer = useRef<number | null>(null)
    const [dragOffset, setDragOffset] = useState<number | null>(null)
    // 임계점 미달로 스냅백하는 동안에도 본문을 유지해서 몸통이 함께 내려가게
    const [settling, setSettling] = useState(false)

    // 이만큼 넘게 드래그한 채 놓으면 시트가 펼쳐지거나 닫힘
    const DRAG_THRESHOLD = 60

    useEffect(() => () => {
        if (settleTimer.current !== null) window.clearTimeout(settleTimer.current)
    }, [])

    const handleTouchStart = (e: React.TouchEvent) => {
        // 펼친 상태에서 날짜 목록은 자체 스크롤이 있어 드래그 시작 지점에서 제외
        if (!collapsed && (e.target as HTMLElement).closest('[data-no-drag]')) return
        touchStartY.current = e.touches[0].clientY
        didDrag.current = false
        if (settleTimer.current !== null) {
            window.clearTimeout(settleTimer.current)
            settleTimer.current = null
        }
        setSettling(false)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        if (touchStartY.current === null) return
        const delta = e.touches[0].clientY - touchStartY.current
        if (Math.abs(delta) > 5) didDrag.current = true
        // 접힌 상태에선 위로만, 펼친 상태에선 아래로만 따라오도록
        setDragOffset(collapsed ? Math.min(delta, 0) : Math.max(delta, 0))
    }

    const handleTouchEnd = () => {
        const offset = dragOffset
        touchStartY.current = null
        setDragOffset(null)
        if (offset === null) return
        if (collapsed && offset < -DRAG_THRESHOLD) {
            onExpand?.()
        } else if (!collapsed && offset > DRAG_THRESHOLD) {
            onCollapse?.()
        } else if (collapsed) {
            setSettling(true)
            settleTimer.current = window.setTimeout(() => setSettling(false), 300)
        }
    }

    const handleClick = () => {
        if (!collapsed || didDrag.current) return
        onExpand?.()
    }

    // 접혀 있어도 드래그/스냅백 중에는 본문을 렌더링해서 시트 몸통이 손가락을 따라오게
    const showContent = !collapsed || dragOffset !== null || settling

    const weekdayMap: { [key: number]: string } = {
        0: 'S', // Sunday
        1: 'M', // Monday
        2: 'T', // Tuesday
        3: 'W', // Wednesday
        4: 'T', // Thursday
        5: 'F', // Friday
        6: 'S', // Saturday
    }
    
    const formatDate = (dateStr: string) => {
        const [month, day] = dateStr.split('/')
        // 간단한 요일 계산을 위해 2025년 기준
        const date = new Date(2025, parseInt(month) - 1, parseInt(day))
        const weekday = weekdayMap[date.getDay()]
        return `${month}월 ${day}일 (${weekday})`
    }
    
    const isDateInOrderList = (meal: MealSelection) => {
        return orderList.some(o => o && o.date === meal.date && o.period === meal.period)
    }
    
    const handleDateClick = (meal: MealSelection) => {
        if (isDateInOrderList(meal)){
            handleRemoveOrder(orderList.findIndex(o => o && o.date === meal.date && o.period === meal.period))
            return
        }
        
        const firstEmptyIndex = orderList.findIndex(o => o === null)
        if (firstEmptyIndex !== -1) {
            const newOrderList = [...orderList]
            newOrderList[firstEmptyIndex] = meal
            setOrderList(newOrderList)
        }
    }
    
    const handleRemoveOrder = (index: number) => {
        const newOrderList = [...orderList]
        newOrderList[index] = null
        setOrderList(newOrderList)
    }
    
    const containerClass = `${setOrderContainer} ${collapsed ? setOrderCollapsed : setOrderExpanded}`

    return (
        <div
            className={containerClass}
            ref={containerRef}
            onClick={handleClick}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
                ...(collapsed ? { cursor: 'pointer', touchAction: 'none' } : {}),
                ...(dragOffset !== null ? {
                    transform: `translateY(${dragOffset}px)`,
                    transition: 'none',
                } : {}),
            }}
        >
            <div className={sheetHandle} style={collapsed ? undefined : { touchAction: 'none' }} />
            <div className={orderTitleContainer}>
                <span className={orderTitle}>우선순위 설정</span>
                <span className={orderStar}>*</span>
                <span className={orderHighlight}>(선택)</span>
            </div>

            {showContent && (
                <>
                    <span className={orderDescription}>아래 날짜 중 원하는 날짜를 클릭해서 추가해주세요</span>
                    
                    {/* 우선순위 슬롯 */}
                    <div className={priorityList}>
                        {orderList.map((order, index) => (
                            <div key={index} className={priorityItem}>
                                <div className={priorityNumber}>{index + 1}</div>
                                <div className={prioritySlot}>
                                    {order && (
                                        <>
                                            <Icon 
                                                path={order.period === 'LUNCH' ? mdiWeatherSunny : mdiWeatherNight}
                                                size={0.6}
                                                color={subtle1}
                                            />
                                            <span className={dateText}>
                                                {formatDate(order.date)} — {order.period === 'LUNCH' ? '점심' : '저녁'}
                                            </span>
                                            {/* <div className={closeIcon} onClick={() => handleRemoveOrder(index)}>
                                                <Icon path={mdiClose} size={0.6} color={subtle1} />
                                            </div> */}
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* 구분선 */}
                    <div className={divider} />
                    
                    {/* 선택 가능한 날짜 목록 */}
                    <div className={datesList} data-no-drag>
                        {selectedDates.map((meal, index) => {
                            const isSelected = isDateInOrderList(meal)
                            return (
                                <div 
                                    key={`${meal.date}-${meal.period}-${index}`}
                                    className={`${dateChip} ${isSelected ? dateChipSelected : ''}`}
                                    onClick={() => handleDateClick(meal)}
                                    style={{
                                        cursor: isSelected ? 'default' : 'pointer',
                                        opacity: isSelected ? 0.7 : 1,
                                    }}
                                >
                                    <Icon 
                                        path={meal.period === 'LUNCH' ? mdiWeatherSunny : mdiWeatherNight}
                                        size={0.6}
                                        color={isSelected ? '#FFFFFF' : subtle1}
                                    />
                                    <span className={dateText} style={{ color: isSelected ? '#FFFFFF' : subtle1 }}>
                                        {formatDate(meal.date)} — {meal.period === 'LUNCH' ? '점심' : '저녁'}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </>
            )}
        </div>
    )
}
