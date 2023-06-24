import './App.css';
import { GlobalStyle } from './styles/GlobalStyle';
import {useLocation, Route, Routes} from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar/Navbar';
import BossResult from './page/BossResult';
import DemoResult from './page/DemoResult';
import JoinUs from './page/JoinUs';
import LogIn from './page/LogIn';
import VoteBoss from './page/VoteBoss';
import VoteDemo from './page/VoteDemo';

function App() {
    const location = useLocation();
    return (
        <Container>
            <GlobalStyle/>
            <Navbar location = {location.pathname}/>
            <RightContainer>
                <Routes>
                    <Route path="/logIn" element={<LogIn/>}/>
                    <Route path="/joinUs" element={<JoinUs/>}/>
                    <Route path="/voteBoss" element={<VoteBoss/>}/>
                    <Route path="/bossResult" element={<BossResult/>}/>
                    <Route path="/voteDemo" element={<VoteDemo/>}/>
                    <Route path="/demoResult" element={<DemoResult/>}/>
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
    width: 100%;
    height: 100%;
    display: flex;
    background-color: #F9F9F9;
`

export default App;
