import styled from 'styled-components';

interface props {
    placeholder: string;
    // onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInput({ placeholder }: props) {
    return <Input placeholder={placeholder} />;
}

const Input = styled.textarea`
    width: 744px;
    height: 63px;
    background: #ffffff;
    border: 1.6px solid #efefef;
    border-radius: 0.5rem;
    padding: 12px 0px 12px 28px;
`;
