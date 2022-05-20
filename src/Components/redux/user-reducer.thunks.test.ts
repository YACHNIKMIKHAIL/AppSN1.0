import {followThunkCreator} from "./user-reducer";
import {usersApi} from "../../API/UsersApi";
import {ApiRespType, ResultCodeEnum} from "../../API/Api";

jest.mock('../../API/UsersApi')
const usersApiMock = usersApi
const mockResponse: ApiRespType = {
    data: {},
    messages: [],
    resultCode: ResultCodeEnum.Success
}
// @ts-ignore
usersApiMock.follow.mockReturnValue(Promise.resolve(mockResponse))


test('user followSuccess test', () => {
    const thunk = followThunkCreator(1)
    const dispatchMock = jest.fn()

    // @ts-ignore
    thunk(dispatchMock)

    expect(dispatchMock).toBeCalledTimes(3)
})