import axios from "axios";
import {UserType} from "./UsersApi";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers:
        {"API-KEY": "3054dc60-1df1-480c-a08f-6e543a8dcaf0"}
})



export enum ResultCode {
    Success = 0,
    Error = 1,
    Trouble = 10
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}
export type getItemsType={
    error:string|null
    items:UserType[]
    totalCount:number
}

export type RespType<D = {}, RC = ResultCode> = {
    data: D
    resultCode: RC
    messages: string[]
}