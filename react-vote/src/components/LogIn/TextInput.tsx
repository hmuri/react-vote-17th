import styled from 'styled-components';

interface props {
    placeholder: string;
    type: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInput({ placeholder, type, value, onChange }: props) {
    return <Input placeholder={placeholder} type={type} value={value} onChange={onChange} />;
}
const Input = styled.input`
    width: 744px;
    height: 63px;
    background: #ffffff;
    border: 1.6px solid #efefef;
    border-radius: 0.5rem;
    padding: 12px 0px 12px 28px;
    font-size: 24px;
`;
