import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IUserInfo } from '../interface';
import { ReactComponent as Crown } from '../assets/images/Crown.svg';
import axios from 'axios';
import { useSetAllIndividualsState, useAllIndividuals, voteResultList } from '../recoil';
import { useLocation } from 'react-router';

export default function BossResult() {
    // 로그인 하면 활용해볼 예정
    // const location = useLocation();
    // const part = location.state.data;
    const part = '프론트';
    // const [part, setPart] = useState<IUserInfo['part']>('');
    let subtitle = '';

    if (part === '프론트') {
        subtitle = '프론트';
    } else if (part === '백엔드') {
        subtitle = '백엔드';
    }

    const setAllIndividualsState = useSetAllIndividualsState();
    const voteResult = useAllIndividuals();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://ceos-vote.kro.kr/votes/part/', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = response.data;

                // 기존 default 값을 복제하여 새로운 배열 생성
                // 만약에 유저의 part가 프론트엔드라면
                const frontendMembers = voteResult.filter((member) => member.team === '프론트엔드');
                console.log('front', frontendMembers);
                // 만약에 유저의 part가 백엔드라면
                const backendMembers = voteResult.filter((member) => member.team === '백엔드');
                console.log('back', backendMembers);

                const updatedVoteResult = voteResult.map((item) => ({ ...item }));
                console.log('updatedVoteResult', updatedVoteResult);
                console.log('voteResult는', voteResult);

                // 서버에서 받아온 데이터를 기존 default 값에 추가
                data.vote_count.forEach((incomingitem: { part: string; total: number }) => {
                    frontendMembers.forEach((originalItem: { part: string; total: number }) => {
                        if (originalItem.part === incomingitem.part) {
                            if (incomingitem.total !== 0) {
                                originalItem.total = incomingitem.total;
                            }
                        }
                    });
                });
                //updatedVoteResult 내림차순으로 sort 필요
                frontendMembers.sort((a, b) => b.total - a.total);

                setAllIndividualsState(frontendMembers);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    console.log('voteResult', voteResult);
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
