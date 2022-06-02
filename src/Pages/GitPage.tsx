import React, {useState} from 'react';

const GitPage = () => {
    const [selectedU, setSelectedU] = useState<string | null>(null)
    return (
        <div style={{display: 'flex'}}>
            <div>
                <div>
                    <input type="text" placeholder={'saerch'}/>
                    <button>find</button>
                </div>
                <ul>
                    {['dcwedfc', 'cae`adfc'].map((m, i) => <li key={i} onClick={() => {
                        document.title = m
                        setSelectedU(m)
                    }}
                                                               style={selectedU === m ? {color: 'red'} : {}}>{m}</li>)}
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