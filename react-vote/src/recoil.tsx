import { atom, selector } from 'recoil';
import { IUserInfo } from './interface';

export const userActive = atom<boolean>({
    key: "userActive",
    default: false
});

export const userInfo = atom<IUserInfo>({
    key: "userInfo",
    default: {
        username: "",
        password: "",
        email: "",
        name: "",
        part: "",
        team: "",
    }
});