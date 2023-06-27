import axios, { AxiosError } from 'axios';

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userInfo, userActive } from '../recoil';

interface ErrorResponse {
    message: string;
}

export default function LogIn() {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [userInfos, setUserInfo] = useRecoilState(userInfo);
    const [active, setActive] = useRecoilState(userActive);
    useEffect(() => {
        localStorage.setItem('active', active.toString());
      }, [active]);
    const navigateToVoteBoss = () =>{
        window.location.replace("/voteBoss");
    }
    const onClickLogIn = async () => {
        try{
            const formData = new FormData();
            formData.append('username', id);
            formData.append('password', pw);

        const response = await axios.post(`https://ceos-vote.kro.kr/accounts/login/`, formData);
        const data = response.data;

        if(data.message === "로그인 성공"){
            const accessToken = data.token.access;
            axios.defaults.headers.common['Authorization'] = accessToken;
            localStorage.setItem('access', JSON.stringify(accessToken));
            setUserInfo(data.user);
            localStorage.setItem('userInfo', JSON.stringify(data.user));
            setActive(true);
            navigateToVoteBoss();

        }else {
            throw new Error(data.message);
        }
    } catch(error){
        const axiosError = error as AxiosError<ErrorResponse>; // Use the custom error response type

    if (axiosError.response) {
        const errorMessage = axiosError.response.data.message; // Now TypeScript knows that `data` has a `message` property
        if (errorMessage === "로그인 실패") {
            alert("존재하지 않는 아이디입니다.");
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
    };


    return (
        // Temp와 TempSideBar는 스크롤바가 완성된 후 삭제 예정
            <Wrapper>
                <form onSubmit={onSubmit}>
                <Input 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setId(e.target.value)}
                    placeholder="아이디를 입력해주세요"
                    type = "text"
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