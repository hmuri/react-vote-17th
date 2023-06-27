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
    const [team, setSelectTeam] = useState('');

    const selectTeam = (teamName: string) =>{
        setSelectTeam(teamName);
        console.log(teamName);
    }


    const voteDemo = async () =>{
        try{
            const formData = new FormData();
            formData.append('team', team);
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
    };


    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        voteDemo();
    };
    
    return(
        <Container>
            <form onSubmit = {onSubmit}>
                {teams.map((team, index) => (
                    <div key={index}>
                        <TeamBox type="button" onClick={() => selectTeam(team.name)}>Team: {team.name}</TeamBox>
                    </div>
                ))}
                <SubmitBtn type="submit">제출하기</SubmitBtn>
            </form>
        </Container>
    );
}

export default VoteDemo;

const Container = styled.div`
`

const TeamBox = styled.button`
`

const SubmitBtn = styled.button`
`