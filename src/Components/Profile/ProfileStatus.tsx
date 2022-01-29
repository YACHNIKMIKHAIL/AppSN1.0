import React from 'react';


class ProfileStatus extends React.Component<{ status: string, updateStatus: (status: string) => void }> {
    state = {
        editMode: false,
        status:this.props.status
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

    render() {
        return (
            <div>
                {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode}>{this.props.status}</span>
                </div>}
                {this.state.editMode &&
                <div>
                    <input value={this.state.status} onBlur={this.deactivateEditMode} autoFocus/>
                </div>}

            </div>
        );
    }

};

export default ProfileStatus;