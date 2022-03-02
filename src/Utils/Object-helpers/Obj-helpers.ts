import {UserType} from "../../Components/redux/user-reducer";

export const updateObjectInArray = (itemsId: number, newOblProps: any, items: Array<UserType>) => {
    return items.map(m => m.id === itemsId ? {...m, ...newOblProps} : m)
}