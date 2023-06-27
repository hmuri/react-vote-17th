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
    const active = useRecoilValue(userActive);
    if (!active) {
        alert('로그인이 필요합니다.');
        return <Navigate to="/" replace />;
    }
    return <>{children}</>;
}

function App() {
    const location = useLocation();
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
                    <Route path="/" element={<LogIn/>}/>
                    <Route path="/signUp" element={<SignUp/>}/>
                    <Route path="/voteBoss" element={<CheckLogin><VoteBoss/></CheckLogin>}/>
                    <Route path="/bossResult" element={<CheckLogin><BossResult/></CheckLogin>}/>
                    <Route path="/voteDemo" element={<CheckLogin><VoteDemo/></CheckLogin>}/>
                    <Route path="/demoResult" element={<CheckLogin><DemoResult/></CheckLogin>}/>
                </Routes>
            </RightContainer>
        </Container>
    );
}

const Container = styled.div`
    background-color: #F9F9F9;
    display: flex;
    flex-direction: row;

`
const RightContainer = styled.div`
    margin-left: 186px;
    width: 100%;
    height: 100%;
    display: flex;
    background-color: #F9F9F9;
    height: 100vh;
`

export default App;
