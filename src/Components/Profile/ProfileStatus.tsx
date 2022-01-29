import React from 'react';


class ProfileStatus extends React.Component<{ status: string }> {
    state = {
        editMode: false,
        title: 'fvefasv'
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
                    <input value={this.state.title} onBlur={this.deactivateEditMode} autoFocus/>
                </div>}

            </div>
        );
    }

};

export default ProfileStatus;