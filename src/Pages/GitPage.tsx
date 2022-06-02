import React from 'react';

const GitPage = () => {
    return (
        <div>
            <div>
                <div>
                    <input type="text" placeholder={'saerch'}/>
                    <button>find</button>
                </div>
                <ul>
                    {['dcwedfc', 'cae`adfc'].map((m, i) => <li key={i}>{m}</li>)}
                </ul>
            </div>
            <div>
                <h2>User name</h2>
                <div>details</div>
            </div>
        </div>
    );
};

export default GitPage;