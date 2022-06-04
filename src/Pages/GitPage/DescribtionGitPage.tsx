import React from 'react';
import {UserType} from "./GitPage";

const DescribtionGitPage: React.FC<{ uDetails: UserType | null }> = ({uDetails}) => {
    // const [uDetails, setUDetails] = useState<UserType | null>(null)
    return (
        <div>
            <img src={uDetails?.avatar_url} alt={'cdjshg'}
                 style={{height: '300px', width: '300px'}}/>

            <div>
                <h2>{uDetails?.login}</h2>
                {uDetails?.followers && <h4> folowers: {uDetails.followers}</h4>}
            </div>


        </div>
    );
};

export default DescribtionGitPage;