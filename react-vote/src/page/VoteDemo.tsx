import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import axios, { AxiosError }  from 'axios';
import {teamList} from '../recoil';
import { useRecoilState } from 'recoil';
import { ITeam } from '../interface';

interface ErrorResponse {
    message: string;
}


function VoteDemo(){
    const [teams, setTeams] = useRecoilState<ITeam[]>(teamList);
    const [selectedTeam, setSelectTeam] = useState('');


    const selectTeam = (teamName: string) =>{
        if (selectedTeam === teamName) {
            setSelectTeam(''); // 이미 선택된 팀이면 선택 해제
          } else {
            setSelectTeam(teamName); // 선택되지 않은 팀이면 선택 상태로 설정
            console.log(teamName);
          }
    }


    const voteDemo = async () =>{
        if(selectedTeam ===''){
            alert('팀을 선택해주세요');
        }else{
        try{
            const formData = new FormData();
            formData.append('team', selectedTeam);
            const accessToken = localStorage?.getItem('access')?.replace(/"/g, "");
            const response = await axios.post(`https://ceos-vote.kro.kr/votes/team/`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }, 
            });
            const data = response.data;    
            if(data.message === "투표 성공"){
                console.log(data.message);
                console.log(data.data);
                console.log(data.user);
                window.location.replace('/demoResult');
            }else {
                throw new Error(data.message);
            }        
        } catch(error){
            console.error(error);
            const axiosError = error as AxiosError<ErrorResponse>;
            if(axiosError.response){
                const errorMessage = axiosError.response.data.message; // Now TypeScript knows that `data` has a `message` property
                if(errorMessage == "내 팀은 투표 할 수 없습니다!"){
                    alert(errorMessage);
                }else if(errorMessage == "투표는 한 번만!"){
                    alert(errorMessage);
                    window.location.replace('/demoResult');
                }
                console.log(axiosError.response.data);
                console.log(axiosError.response.status);
                console.log(axiosError.response.headers);
            } else if (axiosError.request) {
                console.log(axiosError.request);
            } else {
                console.log('Error', axiosError.message);
            }
        }
    }
    };


    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        voteDemo();
    };
    
    return(
        <Container>
            <SubmitBox>
                <TitleBox>데모데이 팀 투표</TitleBox>
            </SubmitBox>
            <Form onSubmit = {onSubmit}>
                {teams.map((team, index) => (
                    <TeamBox key={index}>
                        <TeamBtn 
                        type="button" 
                        onClick={() => selectTeam(team.name)}
                        isSelected={selectedTeam==team.name}
                        >
                            {team.name}</TeamBtn>
                    </TeamBox>
                ))}
                <SubmitBox>
                    <SubmitBtn type="submit">제출하기</SubmitBtn>
                </SubmitBox>
            </Form>
        </Container>
    );
}

export default VoteDemo;

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const SubmitBox = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
`

const TitleBox = styled.div`
    display: flex;
    width: 359px;
    height: 74px;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
    color: white;
    background-color: #224C97;
    border-radius: 12px;
`
const Form = styled.form`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    height: 70%;
    width: 90%;
`
const TeamBox = styled.div`
    width: 30%;
    height: 145px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const TeamBtn = styled.button<{isSelected: boolean}>`
    appearance: none;
    width: 270px;
    height: 145px;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 23px;
    font-weight: medium;
    border: 1.5px solid #224C97;
    border-radius: 8px;
    background-color: ${(props) => (props.isSelected ? "#224C97" : "white")};
    color: ${(props) => (props.isSelected ? "white" : "black")};
    margin: auto;
    transition: background-color 0.3s ease;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => (props.isSelected ? "#224C97" : "#f5f5f5")}; /* 선택된 상태에서 hover 시 하얀색으로 변경 */
    }
`

const SubmitBtn = styled.button`
    display: flex;
    width: 182px;
    height: 61px;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: light;
    color: white;
    background-color: #224C97;
    border-radius: 12px;
`