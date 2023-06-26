import React from 'react';
import {useEffect} from 'react';
import styled from 'styled-components';
import {userInfo, userActive} from '../../recoil';
import {useRecoilValue, useRecoilState} from 'recoil';
import axios from 'axios';

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
    /*const [active, setActive] = useRecoilState(userActive);
    useEffect(() => {
        localStorage.setItem('active', active.toString());
      }, [active]);
    */
    const onClickLogOut = async () => {
        try{
        const response = await axios.post(`https://ceos-vote.kro.kr/accounts/logout/`, null, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access')}`, // 로그인 시 발급받은 토큰 사용
              }, 
        });
        const data = response.data;
        localStorage.clear();
        alert(data.message);
        } catch(error){

        }
    }
    if (userInfoString){
        const userInfo = JSON.parse(userInfoString);
        console.log(localStorage.getItem('access'));
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
            <div>정보를 찾을 수 없습니다.</div>
        );
    }
}

export default InfoBox;