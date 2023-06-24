import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import NameBox from './NameBox';

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
`

const LogoBox = styled.div`
    width: 100%;
    display: flex;
    height: 138px;
    background-image: url(${process.env.PUBLIC_URL}/image/logo.png);
    background-repeat: no-repeat;
    background-position: center;
    border: solid 2px #F9F9F9;
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
`

function Navbar({location} : {location: string}){
    return(
        <Container>
            <LogoBox/>
            <LogBox isDisabled={false}>로그인</LogBox>
            <NameBox isDisabled={true}/>
            <VoteBox isActive={false} >파트장 투표</VoteBox>
            <VoteBox isActive={false} >데모데이 투표</VoteBox>
        </Container>
    );
}

export default Navbar;