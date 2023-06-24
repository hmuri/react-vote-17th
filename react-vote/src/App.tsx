import './App.css';
import { GlobalStyle } from './styles/GlobalStyle';
import {useLocation} from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar/Navbar';

function App() {
    const location = useLocation();
    return (
        <Container>
            <GlobalStyle/>
            <Navbar location = {location.pathname}/>
            <RightContainer>

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
