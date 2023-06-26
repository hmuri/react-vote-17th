import React from 'react';
import styled from 'styled-components';
import {userInfo} from '../../recoil';
import {useRecoilValue} from 'recoil';

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


function InfoBox({isDisabled} : {isDisabled : boolean}){
    const userInfoString = localStorage.getItem('userInfo');
    if (userInfoString){
        const userInfo = JSON.parse(userInfoString);
    return(
        <Container isDisabled={isDisabled}>
            <NameBox>{userInfo.username}</NameBox>
            <TeamBox>{userInfo.team}</TeamBox>
            <PartBox>{userInfo.part}</PartBox>
            <LogOutBtn>로그아웃</LogOutBtn>
        </Container>
    );
    }else{
        return(
            <div>정보를 찾을 수 없습니다.</div>
        );
    }
}

export default InfoBox;