import styled from 'styled-components';

const VoteBoss = () => {
    const onClickHere = () => {
        window.location.replace('/bossResult');
    };

    return <button onClick={onClickHere}>여기를 클릭하세요</button>;
};

export default VoteBoss;
