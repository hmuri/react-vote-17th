import React, {useEffect} from 'react';
import styled from 'styled-components';
import axios, { AxiosError } from 'axios';
import {teamList} from '../recoil';
import { useRecoilState } from 'recoil';
import { ITeam } from '../interface';

interface ErrorResponse {
    message: string;
}

function DemoResult(){
    const [teams, setTeams] = useRecoilState<ITeam[]>(teamList);
    useEffect(() => {
        demoResult();
    }, []);
    const demoResult = async () =>{
        try{
            const accessToken = localStorage?.getItem('access')?.replace(/"/g, "");
            const response = await axios.get(`https://ceos-vote.kro.kr/votes/team/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }, 
            });
            const voteCount = response.data.vote_count;
            setTeams(teams.map(team => {
                const matchingVote = voteCount.find((vote: { team: string; total: number; }) => team.name===vote.team);
                if(matchingVote){
                    return{
                        ...team,
                        count: matchingVote.total,
                    };
                }
                return team;
            }));
            console.log(response.data);
        } catch(error){
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
    }

    
    return(
        <div>
            {teams.map((team, index) => (
                <div key={index}>
                <p>Team: {team.name}</p>
                <p>Votes: {team.count}</p>
                </div>
            ))}
        </div>
    );
}

export default DemoResult;