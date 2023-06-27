import { atom, selector, useRecoilValue, useSetRecoilState } from 'recoil';
import { IUserInfo } from './interface';

export const userActive = atom<boolean>({
    key: 'userActive',
    default: false,
});

export const userInfo = atom<IUserInfo>({
    key: 'userInfo',
    default: {
        username: 'hmuri',
        password: '2222',
        email: 'minju1326@ewhain.net',
        name: '최민주',
        part: '프론트',
        team: '바리바리',
    },
});

export const voteResultState = atom({
    key: 'voteResult',
    default: { vote_count: [] },
});
export const voteResultList = atom<any[]>({
    key: 'allMembers',
    default: [
        { part: '김지원', total: 0 },
        { part: '김현수', total: 0 },
        { part: '김현우', total: 0 },
        { part: '서찬혁', total: 0 },
        { part: '서혜준', total: 0 },
        { part: '이소정', total: 0 },
        { part: '임탁균', total: 0 },
        { part: '조예지', total: 0 },
        { part: '최유미', total: 0 },
        { part: '황재령', total: 0 },
    ],
});

export const useAllIndividuals = () => {
    return useRecoilValue(voteResultList);
};

export const useSetAllIndividualsState = () => {
    console.log(voteResultList);
    return useSetRecoilState(voteResultList);
};
