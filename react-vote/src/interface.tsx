export interface IUserInfo {
    username: string;
    password: string;
    email: string;
    name: string;
    part: string;
    team: string;
}

export interface ITeam {
    name: string;
    count: number;
    highest: boolean;
}

export interface IVoteItem {
    part: string;
    total: number;
}
