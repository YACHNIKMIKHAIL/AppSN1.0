import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatusWithHooks = ({status, updateStatus}: PropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [newStatus, setNewStatus] = useState<string>(status)

    const activateEditMode = () => {
        setEditMode(true)
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewStatus(e.currentTarget.value)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        updateStatus(newStatus)
    }
    return (
        <div>
            {!editMode ?
                <div>
                    <span onDoubleClick={activateEditMode}>My status: {status || 'No status'}</span>
                </div>
                :
                <div>
                    <input value={newStatus} onChange={onStatusChange} onBlur={deactivateEditMode}
                           autoFocus/>
                </div>}

        </div>
    );
}

export default ProfileStatusWithHooks;