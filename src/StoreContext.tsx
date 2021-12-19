import React from "react";
import {StateType} from "./Components/redux/stote";
import {StoreType} from "./Components/redux/reduxStore";

interface IContextProps {
    state: StateType;
    dispach: ({type}: { type: string }) => void;
    getState: () => StateType;
}


const StoreContext = React.createContext({} as IContextProps)

export type ProviderType = {
    store: StoreType,
    children: any
}

export const Provider = (props: ProviderType) => {
    return <StoreContext.Provider value={props.store}>
        {props.children}
    </StoreContext.Provider>
}


export default StoreContext