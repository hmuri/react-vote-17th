import { atom, selector, useRecoilValue, useSetRecoilState } from 'recoil';
import { IUserInfo, ITeam } from './interface';

export const userActive = atom<boolean>({
    key: 'userActive',
    default: false,
});

export const userInfo = atom<IUserInfo>({
    key: 'userInfo',
    default: {
        username: '',
        password: '',
        email: '',
        name: '',
        part: '',
        team: '',
    },
});

export const voteResultState = atom({
    key: 'voteResult',
    default: { vote_count: [] },
});

export const voteResultList = atom<any[]>({
    key: 'allMembers',
    default: [
        { team: '백엔드', part: '김지원', total: 0 },
        { team: '백엔드', part: '김현수', total: 0 },
        { team: '백엔드', part: '김현우', total: 0 },
        { team: '백엔드', part: '서찬혁', total: 0 },
        { team: '백엔드', part: '서혜준', total: 0 },
        { team: '백엔드', part: '이소정', total: 0 },
        { team: '백엔드', part: '임탁균', total: 0 },
        { team: '백엔드', part: '조예지', total: 0 },
        { team: '백엔드', part: '최유미', total: 0 },
        { team: '백엔드', part: '황재령', total: 0 },
        { team: '프론트엔드', part: '권가은', total: 0 },
        { team: '프론트엔드', part: '김서연', total: 0 },
        { team: '프론트엔드', part: '김문기', total: 0 },
        { team: '프론트엔드', part: '노수진', total: 0 },
        { team: '프론트엔드', part: '배성준', total: 0 },
        { team: '프론트엔드', part: '신유진', total: 0 },
        { team: '프론트엔드', part: '오예린', total: 0 },
        { team: '프론트엔드', part: '이예지', total: 0 },
        { team: '프론트엔드', part: '장효신', total: 0 },
        { team: '프론트엔드', part: '최민주', total: 0 },
    ],
});

export const useAllIndividuals = () => {
    return useRecoilValue(voteResultList);
};

export const useSetAllIndividualsState = () => {
    return useSetRecoilState(voteResultList);
};

export const teamList = atom<ITeam[]>({
    key: 'team',
    default: [
        { name: '바리바리', count: 0 },
        { name: 'Dansupport', count: 0 },
        { name: 'TherapEase', count: 0 },
        { name: 'Hooking', count: 0 },
        { name: 'Repick', count: 0 },
    ],
});
