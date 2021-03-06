import React, {ChangeEvent} from 'react';

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}
type StateType = {
    editMode: boolean
    status: string
}

class ProfileStatus extends React.Component<PropsType, StateType> {
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

    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                <div>
                    <b>Status: </b><span onDoubleClick={this.activateEditMode}>My status: {this.props.status || 'No status'}</span>
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