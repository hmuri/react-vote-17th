import { atom, selector } from 'recoil';
import { IUserInfo, ITeam } from './interface';

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

export const teamList = atom<ITeam[]>({
    key: "team",
    default: [
        { name: '바리바리', count: 0 },
        { name: 'Dansupport', count: 0 },
        { name: 'TherapEase', count: 0 },
        { name: 'Hooking', count: 0 },
        { name: 'Repick', count: 0 },
    ]
});