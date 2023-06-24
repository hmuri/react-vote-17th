import React from 'react';
import styled from 'styled-components';

const Container = styled.div<{ isDisabled : boolean; }>`
    width: 100%;
    height: 282px;
    background-color: #224C97;
    display: ${props => props.isDisabled === true ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    font-size: 28px;
    font-weight: 400;
    color: white;
`

function NameBox({isDisabled} : {isDisabled : boolean}){
    return(
        <Container isDisabled={false}>

        </Container>
    );
}

export default NameBox;