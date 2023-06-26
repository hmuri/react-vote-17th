import axios from 'axios';

import styled from 'styled-components';
import TextInput from '../components/LogIn/TextInput';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userInfo } from '../recoil';

export default function LogIn() {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [userInfos, setUserInfo] = useRecoilState(userInfo);
    const onClickLogIn = async () => {
        try{
            const formData = new FormData();
            formData.append('username', id);
            formData.append('password', pw);

        const response = await axios.post(`http://3.37.230.93/accounts/login/`, formData);
        const data = response.data;

        if(data.message === "현재 로그인된 유저 정보 조회 성공"){
            const accessToken = data.token.access;
            axios.defaults.headers.common['Authorization'] = accessToken;
            setUserInfo(data.data);
            window.location.replace("/voteBoss");
        }else if (data.message === "로그인 실패"){
            alert("존재하지 않는 아이디입니다.");
        }
    } catch(error){
        console.log(error);
        }
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        // Temp와 TempSideBar는 스크롤바가 완성된 후 삭제 예정
            <Wrapper>
                <form onSubmit={onSubmit}>
                <Input 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setId(e.target.value)}
                    placeholder="아이디를 입력해주세요"
                    />
                <Input 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPw(e.target.value)}
                    placeholder="비밀번호를 입력해주세요"
                    type="password"
                    />
                <Button onClick={onClickLogIn}>로그인</Button>
                </form>
                <JoinText>회원가입</JoinText>
            </Wrapper>
    );
}



const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    height: 100%;
    background-color: #f9f9f9;
`;

const Button = styled.button`
    width: 391px;
    height: 77px;
    background: #224c97;
    border-radius: 0.75rem;
    border: none;
    margin-top: 30px;
`;

const JoinText = styled.div`
    font-size: 16px;
    line-height: 19px;
    margin-top: 30px;
    text-decoration-line: underline;
    color: rgba(33, 33, 33, 0.8);
    cursor: pointer;
`;

const Input = styled.input`
    width: 744px;
    height: 63px;
    background: #ffffff;
    border: 1.6px solid #efefef;
    border-radius: 0.5rem;
    padding: 12px 0px 12px 28px;
`;