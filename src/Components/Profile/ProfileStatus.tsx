import React from 'react';

type ProfileStatusPropsType = {
    status: string
}

class ProfileStatus extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <span>{props.status}</span>
                </div>
                <div>
                    <input value={props.status}/>
                </div>
            </div>
        );
    }

};

export default ProfileStatus;