import { JSXElementConstructor, ReactElement, ReactFragment, useState } from 'react';
import styled from 'styled-components';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { teamList } from '../../recoil';
import { ITeam } from '../../interface';
import { useRecoilValue } from 'recoil';

type DropDownProps = {
    onSelectTeam: (option: string) => void;
};

export default function DropDown({ onSelectTeam }: DropDownProps) {
    const List: ITeam[] = useRecoilValue(teamList);
    const [viewOpen, setViewOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');

    const onClickDropDownButton = () => {
        setViewOpen(!viewOpen);
    };

    const handleSelectValue = (option: string) => {
        setSelectedValue(option);
        onSelectTeam(option);
        setViewOpen(false);
    };

    return (
        <DropDownContainer>
            <DropDownButton type="button" onClick={onClickDropDownButton}>
                {selectedValue ? selectedValue : '팀명'}
                {viewOpen ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
            </DropDownButton>
            {viewOpen && (
                <DropDownList>
                    {List.map((team, index) => (
                        <DropDownListItem key={index} onClick={() => handleSelectValue(team.name)}>
                            {team.name}
                        </DropDownListItem>
                    ))}
                </DropDownList>
            )}
        </DropDownContainer>
    );
}

const DropDownContainer = styled.div`
    position: relative;
`;

const DropDownButton = styled.button`
    width: 8.438rem;
    height: 3rem;
    background: #dcdcdc;
    border-radius: 0.75rem;
    border: none;
    cursor: pointer;

    display: flex;
    align-content: space-between;
    align-items: center;
    justify-content: center;

    font-size: 20px;
    line-height: 24px;
    color: rgba(33, 33, 33, 0.5);
`;

const DropDownList = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #ffffff;
    border: 1px solid #cccccc;
    border-top: none;
`;

const DropDownListItem = styled.div`
    padding: 8px 16px;
    cursor: pointer;

    &:hover {
        background-color: #f2f2f2;
    }
`;
