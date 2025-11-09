import { useState } from 'react'
import TopNav from './interface/TopNav/TopNav'
import Recent from './interface/Recent/Recent'
import CreateNew from './interface/CreateNewBtn/CreateNew'
import Edit from './interface/Edit'
export default function Admin() {
    const [isEditing, setIsEditing] = useState(false)
    const goAdminMain = () => {
        setIsEditing(false)
    }
    return (
        <div>
            <TopNav isEditing={isEditing} setIsEditing={setIsEditing} />
            {!isEditing && (
                <>
                    <Recent />
                    <CreateNew setIsEditing={setIsEditing} />
                </>
            )}
            {isEditing && (
                <Edit goAdminMain={goAdminMain}/>
            )}
        </div>
    )
}