import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IUserInfo, IVoteItem } from '../interface';
import { ReactComponent as Crown } from '../assets/images/Crown.svg';
import axios from 'axios';
import { useSetAllIndividualsState, useAllIndividuals, voteResultList } from '../recoil';
import { fetchUserPart } from '../api';
import _ from 'lodash';

export default function BossResult() {
    const [userPart, setUserPart] = useState('');
    const [subtitle, setSubtitle] = useState('');

    const setAllIndividualsState = useSetAllIndividualsState();
    const voteResult = useAllIndividuals();

    useEffect(() => {
        const getUserPart = async () => {
            try {
                const user = await fetchUserPart();
                setUserPart(user?.userPart);
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
                console.log('..');

                const filteredVoteResult =
                    userPart == '프론트엔드'
                        ? voteResult.filter((member) => member.team === '프론트엔드')
                        : userPart === '백엔드'
                        ? voteResult.filter((member) => member.team === '백엔드')
                        : voteResult;

                setAllIndividualsState(filteredVoteResult);

                data.vote_count.forEach((incomingItem: { part: string; total: number }) => {
                    for (let i = 0; i < filteredVoteResult.length; i++) {
                        const originalItem = filteredVoteResult[i];
                        if (originalItem.part === incomingItem.part) {
                            if (incomingItem.total !== 0) {
                                setAllIndividualsState((prevFilteredVoteResult) => {
                                    const updatedState = prevFilteredVoteResult.map((item) => {
                                        if (item.part === incomingItem.part) {
                                            return {
                                                ...item,
                                                total: incomingItem.total,
                                            };
                                        }
                                        return item;
                                    });
                                    const sortedState = updatedState.sort((a, b) => b.total - a.total);
                                    return sortedState;
                                });
                            }
                        }
                    }
                });
            } catch (error) {
                console.log(error);
            }
        };
        bossResult();
    }, []);

    //subtitle 결정
    useEffect(() => {
        if (userPart === '프론트엔드') {
            setSubtitle('프론트엔드');
        } else if (userPart === '백엔드') {
            setSubtitle('백엔드');
        }
    }, [userPart]);

    return (
        <ResultWrapper>
            <Header>🎉축하합니다!🎉</Header>
            <SubTitle>{subtitle} 파트장 투표 결과</SubTitle>
            <ResultList>
                {voteResult.map((item: { part: string; total: number }, index: number) => (
                    <ResultBox key={index} isFirst={index === 0}>
                        {index === 0 && <Crown />}
                        <p>{item.part}</p>
                        <p>{item.total}</p>
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
