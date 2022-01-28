import React from 'react';

type ProfileStatusPropsType = {
    status: string
}

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        title: 'blabla'
    }

    activateEditMode() {
        this.setState(
            this.state.editMode = true
        )
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode.bind(this)}>{this.state.title}</span>
                </div>}
                {this.state.editMode &&
                <div>
                    <input value={this.state.title}/>
                </div>}

            </div>
        );
    }

};

export default ProfileStatus;