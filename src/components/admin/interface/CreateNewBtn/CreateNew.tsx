import { createNewButton, createNewIcon, createNewText } from './CreateNew.css'

export default function CreateNew({ handleCreateNewClick }: { handleCreateNewClick: () => void }) {
    return (
        <button className={createNewButton} onClick={handleCreateNewClick}>
            <img src="/Edit.png" alt="Edit" className={createNewIcon} />
            <span className={createNewText}>Create new</span>
        </button>
    )
}

