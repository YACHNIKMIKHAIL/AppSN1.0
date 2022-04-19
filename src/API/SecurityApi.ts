import {instance} from "./Api";

type GetCaptchUrlResponseType={
    url:string
}

export const securityApi = {
    getCaptchUrl() {
        return instance.get<GetCaptchUrlResponseType>(`security/get-captcha-url`).then(response => {
            return response.data
        })
    }
}