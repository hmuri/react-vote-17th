import './App.css';
import React, {ReactNode, ReactElement} from 'react';
import { GlobalStyle } from './styles/GlobalStyle';
import {useLocation, Route, Routes, Navigate} from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar/Navbar';
import BossResult from './page/BossResult';
import DemoResult from './page/DemoResult';
import SignUp from './page/SignUp';
import LogIn from './page/LogIn';
import VoteBoss from './page/VoteBoss';
import VoteDemo from './page/VoteDemo';
import { userActive } from './recoil';
import { useRecoilValue } from 'recoil';

function CheckLogin({children}: {children: ReactNode}): ReactElement | null {
    const userActive = localStorage.getItem('active');
    const isActive = userActive ? JSON.parse(userActive) : false 
    if (!isActive) {
        alert('로그인이 필요합니다.');
        return <Navigate to="/" replace />;
    }
    return <>{children}</>;
}
function CheckLogout({children}: {children: ReactNode}): ReactElement | null {
    const location = useLocation();
    const userActive = localStorage.getItem('active');
    const isActive = userActive ? JSON.parse(userActive) : false 
    if (isActive) {
        alert('로그인 상태입니다. 로그아웃 후 시도하십시오');
        return <Navigate to={location.pathname} replace />;
    }
    return <>{children}</>;
}


function App() {
    const location = useLocation();
    const ResetAll = () => {
        localStorage.clear();
        window.location.replace('/');
    }
    /*const goToLogIn = () => {
        alert('로그인이 필요합니다.');
        return <Navigate to="/" replace />;
    }*/
    return (
        <Container>
            <GlobalStyle/>
            <Navbar location = {location.pathname}/>
            <RightContainer>
                <Routes>
                    <Route path="/" element={<CheckLogout><LogIn/></CheckLogout>}/>
                    <Route path="/signUp" element={<CheckLogout><SignUp/></CheckLogout>}/>
                    <Route path="/voteBoss" element={<CheckLogin><VoteBoss/></CheckLogin>}/>
                    <Route path="/bossResult" element={<CheckLogin><BossResult/></CheckLogin>}/>
                    <Route path="/voteDemo" element={<CheckLogin><VoteDemo/></CheckLogin>}/>
                    <Route path="/demoResult" element={<CheckLogin><DemoResult/></CheckLogin>}/>
                </Routes>
            </RightContainer>
            <FloatingButton onClick={ResetAll}>
                🔄
            </FloatingButton>
        </Container>
    );
}

const Container = styled.div`
    background-color: #F9F9F9;
    display: flex;
    flex-direction: row;

`
const RightContainer = styled.div`
    width: calc(100vw - 186px);
    height: 100vh;
    display: flex;
    background-color: #F9F9F9;
    position: fixed;
    top: 0;
    left: 186px;
`
const FloatingButton = styled.button`
    position: fixed;
    background-color: #F9F9F9;
    right: 20px;
    top: 20px;
    border: none;
    font-size: 40px;
    cursor: pointer;
    z-index: 1000;
    opacity: 0.8;
`;

export default App;
