import React, {ChangeEvent} from 'react';


class ProfileStatus extends React.Component<{ status: string, updateStatus: (status: string) => void }> {
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState(
            {editMode: true}
        )
    }

    deactivateEditMode = () => {
        this.setState(
            {editMode: false}
        )
        this.props.updateStatus(this.state.status);
    }
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({status: e.currentTarget.value})
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode}>My status: {this.props.status || 'No status'}</span>
                </div>}
                {this.state.editMode &&
                <div>
                    <input value={this.state.status} onChange={this.onStatusChange} onBlur={this.deactivateEditMode}
                           autoFocus/>
                </div>}

            </div>
        );
    }

}

export default ProfileStatus;