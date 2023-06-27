import axios, { AxiosError } from 'axios';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { voteResultList } from '../recoil';
import { useEffect, useState } from 'react';
import { ErrorResponse } from '@remix-run/router';
import { fetchUserPart } from '../api';

export default function VoteBoss() {
    const [members, setMembers] = useRecoilState<any[]>(voteResultList);
    const [selectedMember, setSelectedMember] = useState('');
    const [userPart, setUserPart] = useState('');
    const [filteredMembers, setFilteredMembers] = useState<any[]>([]);

    const selectMember = (memberName: string) => {
        setSelectedMember(memberName);
    };

    //현재 로그인한 유저의 part 정보 가져오기
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
        } catch (error) {
            console.error(error);
            const axiosError = error as AxiosError<ErrorResponse>;
            if (axiosError.response) {
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

    return (
        <VoteWrapper onSubmit={onSubmit}>
            <HeaderBox>프론트 파트장 투표</HeaderBox>
            <VoteList>
                {filteredMembers.map((value, index) => (
                    <div key={index}>
                        <ResultBox onClick={() => selectMember(value.part)}>{value.part}</ResultBox>
                    </div>
                ))}
            </VoteList>
            <SubmitButton>투표완료</SubmitButton>
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
`;

const VoteList = styled.div`
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    width: 688px;
    height: 456px;
    gap: 20px;
`;

const ResultBox = styled.button`
    display: flex;
    width: 306px;
    height: 74px;
    justify-content: center;
    align-items: center;
    gap: 50px;
    border-radius: 12px;
    font-size: 26px;
    color: black;
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
`;
