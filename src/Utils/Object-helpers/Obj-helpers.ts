import {UserType} from "../../API/UsersApi";

export const updateObjectInArray = (itemsId: number, newOblProps: any, items: Array<UserType>) => {
    return items.map(m => m.id === itemsId ? {...m, ...newOblProps} : m)
}