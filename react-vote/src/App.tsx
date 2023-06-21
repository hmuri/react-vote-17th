import { Route, Routes } from 'react-router-dom';
import './App.css';
import { GlobalStyle } from './styles/GlobalStyle';
import Login from './page/Login';
import SignUp from './page/SignUp';

function App() {
    return (
        <>
            <GlobalStyle />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
            {/* <div>Let's make something fun!</div> */}
        </>
    );
}

export default App;
