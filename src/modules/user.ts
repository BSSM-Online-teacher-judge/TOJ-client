const SET_USER = 'user/SET_USER' as const;
const REMOVE_USER = 'user/REMOVE_USER' as const;

export const setUser = (userInfo: UserInfo) => ({
    type: SET_USER,
    payload: userInfo
});

export const removeUser = () => ({
    type: REMOVE_USER,
})

type UserAction = | ReturnType<typeof setUser> | ReturnType<typeof removeUser>;

export interface UserInfo{
    id: number;
    email: string;
    name: string;
    nickName: string;
    grade: number;
    classRoom: number;
    isLogin: boolean;
    authority: string;
}

export type UserState = UserInfo;
const initialState: UserState = {
    id: 0,
    email: "",
    name: "",
    nickName: "",
    grade: 0,
    classRoom: 0,
    isLogin: false,
    authority: ""
}

function users(
    state: UserState = initialState,
    action: UserAction
): UserState {
    switch(action.type) {
        case SET_USER:
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.nickName = action.payload.nickName;
            state.grade = action.payload.grade;
            state.classRoom = action.payload.classRoom;
            state.isLogin = action.payload.isLogin;
            state.authority = action.payload.authority;
            return state;
        case REMOVE_USER:
            state.id = 0;
            state.email = "";
            state.name = "";
            state.nickName = "";
            state.grade = 0;
            state.classRoom = 0;
            state.isLogin = false;
            state.authority = "";
            return state;
        default:
            return state;
    }
}

export default users;