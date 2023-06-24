import styled from 'styled-components';
import TextInput from '../components/LogIn/TextInput';
import { ButtonHTMLAttributes, useState } from 'react';
import DropDown from '../components/LogIn/DropDown';

type PartButtonProps = {
    selected: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function SignUp() {
    const [selectPart, setSelectPart] = useState('frontend');

    const onClickChoosePart = (part: string) => {
        setSelectPart(part);
    };

    return (

            <Wrapper>
                <PartWrapper>
                    <PartButton onClick={() => onClickChoosePart('frontend')} selected={selectPart === 'frontend'}>
                        프론트엔드
                    </PartButton>
                    <PartButton onClick={() => onClickChoosePart('backend')} selected={selectPart === 'backend'}>
                        백엔드
                    </PartButton>
                </PartWrapper>
                <DropDown />
                <TextInput placeholder="이름" />
                <TextInput placeholder="아이디" />
                <TextInput placeholder="비밀번호" />
                <TextInput placeholder="비밀번호 확인" />
                {/* 각각 value 추가하기 */}
                <Button>회원가입</Button>
                {/* 회원가입 하면 바로 팟짱 투표로 가는걸로할까 아니면 로그인 페이지로 갈까 */}
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