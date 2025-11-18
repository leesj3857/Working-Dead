import { useParams } from "react-router-dom"
import UserComponent from "../components/user"

export default function User() {
    const { code } = useParams<{ code?: string }>()
    return <UserComponent code={code} />
}