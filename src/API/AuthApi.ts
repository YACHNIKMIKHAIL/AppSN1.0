import {instance, ResultCode, ResultCodeForCaptcha} from "./Api";

export const authApi = {
    authMe() {
        return instance.get<AuthRespType<{
            id: number
            email: string
            login: string
        }>>(`auth/me`).then(response => {
            return response.data
        })
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha?: string ) {
        return instance.post<AuthRespType<{
            userId: number
        }>>(`auth/login`, {email, password, rememberMe,captcha})
            .then(response => {
                return response.data
            })
    },
    logout() {
        return instance.delete(`auth/login`)
            .then(response => {
                return response.data
            })
    }
}

type AuthRespType<D> = {
    data: D
    resultCode: ResultCode | ResultCodeForCaptcha
    messages: string[]
}