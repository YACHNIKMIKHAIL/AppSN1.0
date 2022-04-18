import {instance, RespType, ResultCode, ResultCodeForCaptcha} from "./Api";

type MeRespType = {
    id: number
    email: string
    login: string
}
type LoginRespType = {
    userId: number
}
export const authApi = {
    authMe() {
        return instance.get<RespType<MeRespType>>(`auth/me`).then(response => {
            return response.data
        })
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha?: string) {
        return instance.post<RespType<LoginRespType>>(`auth/login`, {email, password, rememberMe, captcha})
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