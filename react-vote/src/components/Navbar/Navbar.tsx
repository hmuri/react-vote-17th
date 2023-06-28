import React, {useEffect, useState} from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import InfoBox from './InfoBox';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userActive } from '../../recoil';



function Navbar({location} : {location: string}){
    const navigate = useNavigate();

        const userActive = localStorage.getItem('active');
        const isActive = userActive ? JSON.parse(userActive) : false 

        console.log(isActive);

    
    const goToVotePage = (path: string) => (event: React.MouseEvent<HTMLDivElement>) => {
        const pageActive = localStorage.getItem('active');
        const isPageActive = pageActive ? JSON.parse(pageActive) : false 
        console.log(isPageActive);
        if(isPageActive){
            navigate(path);
        }else{
            alert('로그인이 필요한 서비스입니다.');
        }
    }
    return(
        <Container>
            <LogoBox/>
            <LogBox isDisabled={isActive ? true : false} >
                {location === '/' ? '로그인' : '회원가입'}
            </LogBox>
            <InfoBox isDisabled={isActive ? false : true}/>
            <VoteBox isActive={(isActive==true)&&((location == '/voteBoss') || (location == '/bossResult'))} onClick={goToVotePage('/voteBoss')}>파트장 투표</VoteBox>
            <VoteBox isActive={(isActive==true)&&((location == '/voteDemo') || (location == '/demoResult'))} onClick={goToVotePage('/voteDemo')}>데모데이 투표</VoteBox>
        </Container>
    );
}

export default Navbar;


const Container = styled.div`
    width: 186px;
    height: 100%;
    background-color : #ffffff;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    height: 100vh;
`

const LogoBox = styled.div`
    width: 100%;
    display: flex;
    height: 138px;
    background-image: url(${process.env.PUBLIC_URL}/image/logo.png);
    background-repeat: no-repeat;
    background-position: center;
    border: solid 2px #F9F9F9;
    transition: background-color 0.3s ease;
`

const LogBox = styled.div<{ isDisabled : boolean; }>`
    width: 100%;
    display: ${props => props.isDisabled === true ? 'none' : 'flex'};
    height: 282px;
    background-color: #224C97;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    font-weight: 400;
    color: white;
    transition: background-color 0.3s ease;
`

const VoteBox = styled.div<{ isActive : boolean; }>`
    width: 100%;
    display: flex;
    height: 138px;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    font-weight: 400;
    color: ${props => props.isActive === true ? '#ffffff' : '#224C97'};
    background-color: ${props => props.isActive === true ? '#224C97' : '#ffffff'};
    border: ${props => props.isActive === true ? 'none' : 'solid 2px #F9F9F9'};
    transition: background-color 0.3s ease;
`