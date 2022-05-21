import {followThunkCreator, unFollowThunkCreator, usersActions} from "./user-reducer";
import {usersApi} from "../../API/UsersApi";
import {ApiRespType, ResultCodeEnum} from "../../API/Api";

jest.mock('../../API/UsersApi')
const usersApiMock = usersApi as jest.Mocked<typeof usersApi>
const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    usersApiMock.follow.mockClear()
    usersApiMock.unFollow.mockClear()
})

const mockResponse: ApiRespType = {
    resultCode: ResultCodeEnum.Success,
    data: {},
    messages: []
}
usersApiMock.follow.mockReturnValue(Promise.resolve(mockResponse))
usersApiMock.unFollow.mockReturnValue(Promise.resolve(mockResponse))


test('async user followSuccess thunk test', async () => {
    const thunk = followThunkCreator(1)


    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, usersActions.toggleFollowingInProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, usersActions.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, usersActions.toggleFollowingInProgress(false, 1))
})

test('async user unFollowSuccess thunk test', async () => {
    const thunk = unFollowThunkCreator(1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, usersActions.toggleFollowingInProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, usersActions.unFollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, usersActions.toggleFollowingInProgress(false, 1))
})