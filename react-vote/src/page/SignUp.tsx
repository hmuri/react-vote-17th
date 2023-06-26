import styled from 'styled-components';
import TextInput from '../components/LogIn/TextInput';
import { ButtonHTMLAttributes, useState } from 'react';
import DropDown from '../components/LogIn/DropDown';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type PartButtonProps = {
    selected: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function SignUp() {
    const [selectPart, setSelectPart] = useState('frontend');
    const [selectTeam, setSelectTeam] = useState('');
    const [name, setName] = useState('');
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const onClickChoosePart = (part: string) => {
        setSelectPart(part);
    };

    const handleSelectTeam = (option: string) => {
        setSelectTeam(option);
    };

    const handleSignUp = async (e: any) => {
        e.preventDefault();

        if (!name || !userId || !password || !confirmPassword || !selectPart || !selectTeam) {
            alert('필요한 정보를 모두 입력해주세요.');
            return;
        }

        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('username', userId);
            formData.append('password', password);
            formData.append('name', name);
            formData.append('part', selectPart);
            formData.append('team', selectTeam);
            formData.append('email', email);

            const response = await axios.post('http://3.37.230.93/accounts/signup', formData);
            const data = response.data;
            alert('회원 가입 성공');
            console.log(data);

        } catch (error) {
            alert('회원 가입에 실패하였습니다.');
        }
    };

    return (
        <SignUpForm onSubmit={handleSignUp}>
            <PartWrapper>
                <PartButton onClick={() => onClickChoosePart('frontend')} selected={selectPart === 'frontend'}>
                    프론트엔드
                </PartButton>
                <PartButton onClick={() => onClickChoosePart('backend')} selected={selectPart === 'backend'}>
                    백엔드
                </PartButton>
            </PartWrapper>
            <DropDown onSelectTeam={handleSelectTeam} />
            <Input type="text" placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} />
            <Input type="text" placeholder="아이디" value={userId} onChange={(e) => setUserId(e.target.value)} />
            <Input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Input
                type="password"
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button>회원가입</Button>
        </SignUpForm>
    );
}

const SignUpForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    height: 100vh;
    background-color: #f9f9f9;
`;

const PartWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 25px;
`;

const PartButton = styled.button<PartButtonProps>`
    width: 360px;
    height: 74px;
    background: ${(props) => (props.selected ? '#224c97' : '#fff')};
    color: ${(props) => (props.selected ? '#fff' : '#224C97')};
    border-radius: 0.75rem;
    border: none;
    margin-top: 30px;
    font-size: 24px;
    cursor: pointer;
`;

const Button = styled.button`
    width: 391px;
    height: 77px;
    background: #224c97;
    border-radius: 0.75rem;
    border: none;
    margin-top: 30px;
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