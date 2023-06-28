import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios, { AxiosError } from 'axios';
import { teamList } from '../recoil';
import { useRecoilState } from 'recoil';
import { ITeam } from '../interface';

interface ErrorResponse {
    message: string;
}

function DemoResult() {
    const [teams, setTeams] = useRecoilState<ITeam[]>(teamList);
    const maxVotes = Math.max(...teams.map((team) => team.count));
    const getRankEmoji = (index: number, count: number, prevCount: number, isHighest: boolean) => {
        if (count === prevCount) {
            switch (
                index - 1 // 이전 등수의 이모지를 그대로 사용
            ) {
                case 0:
                    return '🥇';
                case 1:
                    return '🥈';
                case 2:
                    return '🥉';
                default:
                    return '🏅';
            }
        } else {
            switch (
                index // 이전 등수 + 1 의 이모지를 사용
            ) {
                case 0:
                    return '🥇';
                case 1:
                    return '🥈';
                case 2:
                    return '🥉';
                default:
                    return '🏅';
            }
        }
    };
    useEffect(() => {
        demoResult();
    }, []);
    const demoResult = async () => {
        try {
            const accessToken = localStorage?.getItem('access')?.replace(/"/g, '');
            const response = await axios.get(`https://ceos-vote.kro.kr/votes/team/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const voteCount = response.data.vote_count;
            let updatedTeams = teams.map((team) => {
                const matchingVote = voteCount.find((vote: { team: string; total: number }) => team.name === vote.team);
                if (matchingVote) {
                    return {
                        ...team,
                        count: matchingVote.total,
                    };
                }
                return team;
            });
            console.log(response.data);

            updatedTeams = [...updatedTeams].sort((a, b) => b.count - a.count);
            const maxVotes = Math.max(...updatedTeams.map((team) => team.count));
            updatedTeams = updatedTeams.map((team) => ({
                ...team,
                highest: team.count === maxVotes,
            }));

            setTeams(updatedTeams);
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>; // Use the custom error response type

            if (axiosError.response) {
                const errorMessage = axiosError.response.data.message; // Now TypeScript knows that `data` has a `message` property
                console.log(axiosError.response.data);
                console.log(axiosError.response.status);
                console.log(axiosError.response.headers);
            } else if (axiosError.request) {
                console.log(axiosError.request);
            } else {
                console.log('Error', axiosError.message);
            }
        }
    };

    return (
        <Container>
            <Header>🎉축하합니다!🎉</Header>
            <SubTitle>데모데이 팀 투표 결과</SubTitle>
            {teams.map((team, index) => (
                <RankingBox key={index} isSelected={team.highest}>
                    <p style={{ fontSize: '30px' }}>
                        {getRankEmoji(index, team.count, index > 0 ? teams[index - 1].count : -1, team.highest)}
                    </p>
                    <p style={{ width: '80%', fontSize: '28px' }}>{team.name}</p>
                    <p style={{ fontSize: '24px' }}>{team.count}</p>
                </RankingBox>
            ))}
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const Header = styled.h1`
    font-size: 48px;
    color: #224c97;
    margin-bottom: 0px;
`;

const SubTitle = styled.h2`
    font-size: 32px;
    color: #224c97;
    margin-top: 20px;
`;
const RankingBox = styled.div<{ isSelected: boolean }>`
    display: flex;
    width: 455px;
    height: 74px;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-bottom: 1rem;
    background-color: ${(props) => (props.isSelected ? '#224C97' : 'white')};
    color: ${(props) => (props.isSelected ? 'white' : 'black')};
    border-radius: 12px;
`;

export default DemoResult;
