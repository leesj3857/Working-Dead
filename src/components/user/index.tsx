import { useState } from 'react'
import TopNav from './interface/TopNav/TopNav'
import Description from './interface/Description/Description'
import SelectUser from './interface/Step1/SelectUser/SelectUser'
import SaveButton from './interface/Step2/SaveButton/SaveButton'
import CurrentStatus from './interface/Step2/CurrentStatusBtn/CurrentStatus'
import CurrentStatusModal from './interface/Step2/CurrentStatusModal/CurrentStatusModal'
import Calendar from './interface/Step2/Calendar/Calendar'
import SetOrder from './interface/Step2/SetOrder/SetOrder'
import SavedModal from './interface/Step2/SavedModal/SavedModal'
import AlertContent from './interface/Step2/AlertContent/AlertContent'
interface MealSelection {
    date: string
    mealType: 'lunch' | 'dinner'
}
export default function User() {
    const [step, setStep] = useState(0)
    const userList = [{ id: '최윤서', name: '최윤서' }, { id: '장동윤', name: '장동윤' }, { id: '이상후', name: '이상후' }, { id: '정하연', name: '정하연' }, { id: '이승준', name: '이승준' }, { id: '김세연', name: '김세연' }]
    const [currentStatusOpen, setCurrentStatusOpen] = useState(false)
    const [selectedDates, setSelectedDates] = useState<MealSelection[]>([])
    const [orderList, setOrderList] = useState<(MealSelection | null)[]>([null, null, null])
    const [savedModalOpen, setSavedModalOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [alertType, setAlertType] = useState<'date' | 'order' | null>(null)
    const handleDateAlert = () => {
        setAlertType('date')
        setAlertMessage('날짜를 선택해주세요')
    }
    const handleOrderAlert = () => {
        setAlertType('order')
        setAlertMessage('시간대를 선택해주세요')
    }
    // 날짜 범위 설정 (예시: 2025년 11월 2일 ~ 11월 15일)
    const startDate = new Date(2025, 10, 4) // 월은 0부터 시작 (10 = 11월)
    const endDate = new Date(2025, 10, 15)
    const onNext = ({ id }: { id: string }) => {
        if(!id) {
            return
        }
        setStep(step + 1)
        setSelectedDates([])
        setOrderList([null, null, null])
    }
    const onSaveClick = () => {
        if(selectedDates.length === 0 ) {
            handleDateAlert()
            return
        }
        if(orderList.every(o => o === null)) {
            handleOrderAlert()
            return
        }
        setAlertType(null)
        setAlertMessage('')
        setSavedModalOpen(true)
    }
    const votes = [
        {
            id: '1',
            date: '2025-01-01',
            dayOfWeek: '화',
            mealType: '점심',
            participants: [
                { id: '최윤서', name: '최윤서', star: true },
                { id: '장동윤', name: '장동윤', star: false },
                { id: '이상후', name: '이상후', star: true },
                { id: '정하연', name: '정하연', star: false },
                { id: '이승준', name: '이승준', star: false },
            ]
        },
        {
            id: '2',
            date: '2025-01-02',
            dayOfWeek: '수',
            mealType: '점심',
            participants: [
                { id: '최윤서', name: '최윤서', star: false },
                { id: '김세연', name: '김세연', star: true },
                { id: '이승준', name: '이승준', star: true }
            ]
        },
        {
            id: '3',
            date: '2025-01-03',
            dayOfWeek: '목',
            mealType: '점심',
            participants: [
                { id: '최윤서', name: '최윤서', star: false },
            ]
        },
        {
            id: '4',
            date: '2025-01-04',
            dayOfWeek: '금',
            mealType: '점심',
            participants: [
                { id: '최윤서', name: '최윤서', star: false },
            ]
        },
        {
            id: '5',
            date: '2025-01-05',
            dayOfWeek: '토',
            mealType: '점심',
            participants: [
                { id: '최윤서', name: '최윤서', star: false },
            ]
        },
        {
            id: '6',
            date: '2025-01-06',
            dayOfWeek: '일',
            mealType: '점심',
            participants: [
                { id: '최윤서', name: '최윤서', star: false },
            ]
        }
    ]
    const handleExit = () => {
        setSavedModalOpen(false)
        setStep(0)
        setSelectedDates([])
        setOrderList([null, null, null])
    }

    return (
        <div style={{ paddingBottom: '70px' }}>
            <TopNav step={step} setStep={setStep} />
            <Description title={step === 0 ? '본인 선택' : '가능한 시간'} description={step === 0 ? '가능한 일정을 투표할 본인 이름을 선택해주세요' : '가능한 날짜와 시간대를 모두 선택해주세요'} />
            {step === 0 && <SelectUser userList={userList} onNext={onNext} />}
            {step === 1 && 
            <>
                <Calendar startDate={startDate} endDate={endDate} selectedDates={selectedDates} setSelectedDates={setSelectedDates} setOrderList={setOrderList} />
                <AlertContent message={alertMessage} show={alertType === 'date'} />
                <SetOrder selectedDates={selectedDates} orderList={orderList} setOrderList={setOrderList} />
                <AlertContent message={alertMessage} show={alertType === 'order'} />
                <SaveButton onSaveClick={onSaveClick} />
                <CurrentStatus setCurrentStatusOpen={setCurrentStatusOpen} />
            </>}
            {currentStatusOpen && <CurrentStatusModal isOpen={currentStatusOpen} votes={votes} onClose={() => setCurrentStatusOpen(false)} />}
            {savedModalOpen && <SavedModal onEdit={() => setSavedModalOpen(false)} onExit={handleExit} />}
        </div>
    )
}