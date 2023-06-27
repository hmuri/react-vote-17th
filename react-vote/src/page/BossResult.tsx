import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IUserInfo } from '../interface';
import { ReactComponent as Crown } from '../assets/images/Crown.svg';
import axios from 'axios';
import { useSetAllIndividualsState, useAllIndividuals } from '../recoil';

export default function BossResult() {
    const [part, setPart] = useState<IUserInfo['part']>('');
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
                const updatedVoteResult = voteResult.map((item) => ({ ...item }));
                console.log('updatedVoteResult', updatedVoteResult);

                // 서버에서 받아온 데이터를 기존 default 값에 추가
                data.vote_count.forEach((incomingitem: { part: string; total: number }) => {
                    updatedVoteResult.forEach((originalItem: { part: string; total: number }) => {
                        if (originalItem.part === incomingitem.part) {
                            if (incomingitem.total !== 0) {
                                originalItem.total = incomingitem.total;
                            }
                        }
                    });
                });
                //updatedVoteResult 내림차순으로 sort 필요
                updatedVoteResult.sort((a, b) => b.total - a.total);

                setAllIndividualsState(updatedVoteResult);
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

const ResultList = styled.div``;

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

// import { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import { IUserInfo } from '../interface';
// import { ReactComponent as Crown } from '../assets/images/Crown.svg';
// import axios from 'axios';
// import { useRecoilValue } from 'recoil';
// import { useSetAllIndividualsState, voteResultState } from '../recoil';

// export default function BossResult() {
//     // 파트별로 SubTitle 다르게 나오는 거
//     const [part, setPart] = useState<IUserInfo['part']>('');

//     let subtitle = '';
//     if (part === 'frontend') {
//         subtitle = '프론트';
//     } else if (part === 'backend') {
//         subtitle = '백엔드';
//     }

//     // 여기 다시 보기!
//     const voteResult = useSetAllIndividualsState(voteResultState);
//     const setAllIndividualsState = useSetAllIndividualsState();

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3000/data/bossData.json', {
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 });
//                 const data = response.data;
//                 setAllIndividualsState(data.vote_count); // 수정: setAllIndividualsState 함수 사용
//                 console.log('data', data);
//             } catch (error) {
//                 console.log('error');
//             }
//         };

//         fetchData();
//     }, []);

//     return (
//         <ResultWrapper>
//             <Header>🎉축하합니다!🎉</Header>
//             <SubTitle>{subtitle} 파트장 투표 결과</SubTitle>
//             <ResultList>
//                 {voteResult.vote_count.map &&
//                     voteResult.vote_count.map((item: { part: string; total: number }, index: number) => (
//                         <ResultBox key={index} isFirst={index === 0}>
//                             {index === 0 && <Crown />}
//                             <p>{item.part}</p>
//                         </ResultBox>
//                     ))}
//             </ResultList>
//         </ResultWrapper>
//     );
// }

// const ResultWrapper = styled.div`
//     width: 100%;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     align-content: center;
// `;

// const Header = styled.h1`
//     font-size: 48px;
//     color: #224c97;
// `;
// const SubTitle = styled.h2`
//     font-size: 32px;
//     color: #224c97;
// `;
// const ResultList = styled.div``;
// const ResultBox = styled.div<{ isFirst: boolean }>`
//     display: flex;
//     width: 306px;
//     height: 74px;
//     justify-content: center;
//     align-items: center;
//     gap: 50px;
//     border-radius: 12px;
//     font-size: 26px;
//     background-color: ${(props) => (props.isFirst ? '#224C97' : '#FFFFFF')};
//     color: ${(props) => (props.isFirst ? '#FFFFFF' : '#000000')};
// `;
