import axios, { AxiosError } from 'axios';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { voteResultList } from '../recoil';
import { ButtonHTMLAttributes, useEffect, useState } from 'react';
import { fetchUserPart } from '../api';
import { useNavigate } from 'react-router';

interface ErrorResponse {
    message: string;
}

export default function VoteBoss() {
    const navigate = useNavigate();
    const [members, setMembers] = useRecoilState<any[]>(voteResultList);
    const [selectedMember, setSelectedMember] = useState('');
    const [userPart, setUserPart] = useState('');
    const [userName, setUserName] = useState('');
    const [filteredMembers, setFilteredMembers] = useState<any[]>([]);

    let subtitle = '';

    //현재 로그인한 유저의 part 정보와 name 정보 가져오기
    useEffect(() => {
        const getUserPart = async () => {
            try {
                const user = await fetchUserPart();
                setUserPart(user?.userPart);
                setUserName(user?.userName);
            } catch (error) {
                console.error(error);
            }
        };
        getUserPart();
    }, []);

    const selectMember = (memberName: string) => {
        if (memberName !== userName || selectedMember === memberName) {
            setSelectedMember(memberName);
        } else {
            alert('자기 자신은 투표할 수 없습니다!');
        }
        if (selectedMember === memberName) {
            setSelectedMember(''); // 이미 선택된 팀이면 선택 해제
        } else {
            setSelectedMember(memberName); // 선택되지 않은 팀이면 선택 상태로 설정
            console.log(memberName);
        }
    };

    //가져온 유저의 part 정보에 따라 members 리스트 필터링
    useEffect(() => {
        const filterMembers = () => {
            if (userPart === '프론트엔드') {
                const filtered = members.filter((member) => member.team === '프론트엔드');
                setFilteredMembers(filtered);
            } else if (userPart === '백엔드') {
                const filtered = members.filter((member) => member.team === '백엔드');
                setFilteredMembers(filtered);
            } else {
                setFilteredMembers(members);
            }
        };

        filterMembers();
    }, [members, userPart]);

    const voteBoss = async () => {
        try {
            const formData = new FormData();
            formData.append('part', selectedMember);
            const accessToken = localStorage?.getItem('access')?.replace(/"/g, '');
            const response = await axios.post(`https://ceos-vote.kro.kr/votes/part/`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const data = response.data;
            if (data.message === '투표 성공') {
                window.location.replace('/bossResult');
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error(error);
            const axiosError = error as AxiosError<ErrorResponse>;
            if (axiosError.response) {
                const errorMessage = axiosError.response.data.message;
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

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        voteBoss();
    };

    if (userPart === '프론트엔드') {
        subtitle = '프론트엔드';
    } else if (userPart === '백엔드') {
        subtitle = '백엔드';
    }
    return (
        <VoteWrapper onSubmit={onSubmit}>
            <HeaderBox>{subtitle} 파트장 투표</HeaderBox>
            <VoteList>
                {filteredMembers.map((value, index) => (
                    <div key={index}>
                        <VoteBox
                            type="button"
                            onClick={() => selectMember(value.part)}
                            isSelected={value.part === selectedMember}
                        >
                            {value.part}
                        </VoteBox>
                    </div>
                ))}
            </VoteList>
            <SubmitButton type="submit">투표완료</SubmitButton>
        </VoteWrapper>
    );
}

const VoteWrapper = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-content: center;
    gap: 40px;
`;

const HeaderBox = styled.div`
    display: flex;
    width: 359px;
    height: 74px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 12px;
    background: #224c97;
    color: #fff;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
`;

const VoteList = styled.div`
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    width: 688px;
    height: 456px;
    gap: 20px;
`;

const VoteBox = styled.button<{ isSelected: boolean }>`
    display: flex;
    width: 306px;
    height: 74px;
    justify-content: center;
    align-items: center;
    gap: 50px;
    font-size: 26px;
    gap: 10px;
    border-radius: 12px;
    border: 1.5px solid lightgrey;
    transition: background-color 0.3s ease;
    cursor: pointer;
    background-color: ${(props) => (props.isSelected ? '#224C97' : 'white')};
    color: ${(props) => (props.isSelected ? 'white' : 'black')};
    &:hover {
        background-color: ${(props) =>
            props.isSelected ? '#224C97' : '#f5f5f5'}; /* 선택된 상태에서 hover 시 하얀색으로 변경 */
    }
`;

const SubmitButton = styled.button`
    display: flex;
    width: 182px;
    height: 61px;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 12px;
    background: #224c97;
    font-size: 20px;
    font-weight: light;
`;
