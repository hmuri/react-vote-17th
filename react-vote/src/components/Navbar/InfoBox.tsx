import React from 'react';
import {useEffect} from 'react';
import styled from 'styled-components';
import {userInfo, userActive} from '../../recoil';
import {useRecoilValue, useRecoilState} from 'recoil';
import axios, { AxiosError } from 'axios';

interface ErrorResponse {
    message: string;
}


function InfoBox({isDisabled} : {isDisabled : boolean}){
    const userInfoString = localStorage.getItem('userInfo');
    const [active, setActive] = useRecoilState(userActive);
    useEffect(() => {
        localStorage.setItem('active', active.toString());
      }, [active]);
    const resetStorage = () => {
        localStorage.clear();
    }


    const onClickLogOut = async () => {
        console.log("Logout function is triggered.");
        try{
        const accessToken = localStorage?.getItem('access')?.replace(/"/g, "");
        const response = await axios.post(`https://ceos-vote.kro.kr/accounts/logout/`, {} , {
            headers: {
                Authorization: `Bearer ${accessToken}`,
              }, 
        });
        const data = response.data;
        localStorage.clear();
        resetStorage();
        setActive(false);
        window.location.replace('/'); 
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
    if (userInfoString){
        const userInfo = JSON.parse(userInfoString);
    return(
        <Container isDisabled={isDisabled}>
            <NameBox>{userInfo.username}</NameBox>
            <TeamBox>{userInfo.team}</TeamBox>
            <PartBox>{userInfo.part}</PartBox>
            <LogOutBtn onClick = {onClickLogOut}>로그아웃</LogOutBtn>
        </Container>
    );
    }else{
        return(
            <>
            </>
        );
    }
}

export default InfoBox;



const Container = styled.div<{ isDisabled : boolean; }>`
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 282px;
    background-color: #ffffff;
    display: ${props => props.isDisabled === false ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #224C97;
    font-size: 28px;
    font-weight: 400;
    border-top: solid 1px #224C97;
`
const NameBox = styled.div`
    text-align: center;
    font-size: 40px;
`
const TeamBox = styled.div`

`
const PartBox = styled.div`

`
const LogOutBtn = styled.button`
    font-size: 20px;
    color: #224C97;
    background-color: #ffffff;
    border: solid 1px #224C97;
    border-radius: 2px;
`