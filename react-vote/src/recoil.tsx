import { atom, selector } from 'recoil';
import { IUserInfo } from './interface';

export const userActive = atom<boolean>({
    key: "userActive",
    default: false
});

export const userInfo = atom<IUserInfo>({
    key: "userInfo",
    default: {
        username: "hmuri",
        password: "2222",
        email: "minju1326@ewhain.net",
        name: "최민주",
        part: "Front",
        team: "바리바리",
    }
});