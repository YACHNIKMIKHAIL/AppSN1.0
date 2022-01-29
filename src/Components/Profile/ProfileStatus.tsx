import React from 'react';

type ProfileStatusPropsType = {
    status: string
}

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        title: 'blabla'
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
                    <span onDoubleClick={this.activateEditMode}>{this.state.title}</span>
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