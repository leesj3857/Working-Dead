import TimeComponent from "../components/time"
import { useParams } from "react-router-dom"

export default function Time() {
    const { pollId } = useParams<{ pollId?: string }>()
    
    return <TimeComponent />
}