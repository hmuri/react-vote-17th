import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IUserInfo } from '../interface';
import { ReactComponent as Crown } from '../assets/images/Crown.svg';
import axios from 'axios';
import { useSetAllIndividualsState, useAllIndividuals, voteResultList } from '../recoil';
import { fetchUserPart } from '../api';

export default function BossResult() {
    const [userPart, setUserPart] = useState('');
    let subtitle = '';

    const setAllIndividualsState = useSetAllIndividualsState();
    const voteResult = useAllIndividuals();

    useEffect(() => {
        const getUserPart = async () => {
            try {
                const userPart = await fetchUserPart();
                setUserPart(userPart);
            } catch (error) {
                console.error(error);
            }
        };

        getUserPart();
    }, []);

    useEffect(() => {
        const bossResult = async () => {
            try {
                const response = await axios.get('https://ceos-vote.kro.kr/votes/part/', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = response.data;
                let updatedVoteResult = voteResult.map((item) => ({ ...item }));

                // 만약에 유저의 part가 프론트엔드라면
                if (userPart === '프론트엔드') {
                    updatedVoteResult = voteResult.filter((member) => member.team === '프론트엔드');
                }

                // 만약에 유저의 part가 백엔드라면
                else if (userPart === '백엔드') {
                    updatedVoteResult = voteResult.filter((member) => member.team === '백엔드');
                }

                //updatedVoteResult 내림차순으로 sort 필요
                updatedVoteResult.sort((a, b) => b.total - a.total);

                setAllIndividualsState(updatedVoteResult);
            } catch (error) {
                console.log(error);
            }
        };

        bossResult();
    }, []);

    if (userPart === '프론트엔드') {
        subtitle = '프론트엔드';
    } else if (userPart === '백엔드') {
        subtitle = '백엔드';
    }
    return (
        <ResultWrapper>
            <Header>🎉축하합니다!🎉</Header>
            <SubTitle>{subtitle} 파트장 투표 결과</SubTitle>
            <ResultList>
                {voteResult.map((item: { part: string; total: number }, index: number) => (
                    <ResultBox key={index} isFirst={index === 0}>
                        {index === 0 && <Crown />}
                        <p>{item.part}</p>
                    </ResultBox>
                ))}
            </ResultList>
        </ResultWrapper>
    );
}

const ResultWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-content: center;
`;

const Header = styled.h1`
    font-size: 48px;
    color: #224c97;
`;

const SubTitle = styled.h2`
    font-size: 32px;
    color: #224c97;
`;

const ResultList = styled.div`
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    width: 688px;
    height: 456px;
    gap: 20px;
`;

const ResultBox = styled.div<{ isFirst: boolean }>`
    display: flex;
    width: 306px;
    height: 74px;
    justify-content: center;
    align-items: center;
    gap: 50px;
    border-radius: 12px;
    font-size: 26px;
    background-color: ${(props) => (props.isFirst ? '#224C97' : '#FFFFFF')};
    color: ${(props) => (props.isFirst ? '#FFFFFF' : '#000000')};
`;
