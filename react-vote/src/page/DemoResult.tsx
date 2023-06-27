import React, {useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {teamList} from '../recoil';
import { useRecoilState } from 'recoil';
import { ITeam } from '../interface';


function DemoResult(){
    const [teams, setTeams] = useRecoilState<ITeam[]>(teamList);

    useEffect(() => {
        const demoResult = async () =>{
            try{
                const accessToken = localStorage?.getItem('access')?.replace(/"/g, "");
                const response = await axios.get(`https://ceos-vote.kro.kr/accounts/logout/`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }, 
                });
                const voteCount = response.data.vote_count;
                setTeams(voteCount.map((vote: { team: string; total: number; }) => ({
                name: vote.team,
                count: vote.total,
                })));
            } catch(error){
                console.error(error);
            }
        };
        demoResult();
    }, []);
    
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