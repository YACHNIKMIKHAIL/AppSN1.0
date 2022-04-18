import {instance} from "./Api";

export const securityApi = {
    getCaptchUrl() {
        return instance.get(`security/get-captcha-url`).then(response => {
            return response
        })
    }
}