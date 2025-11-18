import { useState } from 'react'
import TopNav from './interface/TopNav/TopNav'
import Recent from './interface/Recent/Recent'
import CreateNew from './interface/CreateNewBtn/CreateNew'
import Edit from './interface/Edit'
export default function Admin() {
    const [isEditing, setIsEditing] = useState(false)
    const [editVoteId, setEditVoteId] = useState<number | null>(null)
    const goAdminMain = () => {
        setIsEditing(false)
        setEditVoteId(null)
    }
    const handleCreateNewClick = () => {
        setIsEditing(true)
        setEditVoteId(null)
    }
    return (
        <div>
            <TopNav isEditing={isEditing} setIsEditing={setIsEditing} />
            {!isEditing && (
                <>
                    <Recent setIsEditing={setIsEditing} setEditVoteId={setEditVoteId} />
                    <CreateNew handleCreateNewClick={handleCreateNewClick} />
                </>
            )}
            {isEditing && (
                <Edit goAdminMain={goAdminMain} voteId={editVoteId} setEditVoteId={setEditVoteId}/>
            )}
        </div>
    )
}