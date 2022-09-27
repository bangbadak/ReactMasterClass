import { useState, useEffect } from "react";
import { RouterProps, useLocation, useParams } from "react-router-dom";
import styled from 'styled-components';

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1`
    font-size: 48px;
    color:${props => props.theme.accentColor};
`

const Loader = styled.span`
    text-align: center;
    display: block;
`
// ? not use in react router dom v6
// interface RouteParams {
//     coinId: string;
// }

interface RouteState {
    name: string;
}

const Coin = () => {
    const [loading, setLoading] = useState(true);

    const { coinId } = useParams(); //Params
    const { state } = useLocation();
    const [info, setInfo] = useState({});
    const [priceInfo, setPriceInfo] = useState({})
    console.log(state.name);

    useEffect(() => {
        (async () => {
            const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
            const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
            console.log(priceData);
            setInfo(infoData);
            setPriceInfo(priceData)
        })();
    }, []);

    return (
        <Container>
            <Header>
                <Title>{state?.name || "Loading"}</Title>
            </Header>
            {loading ? <Loader>Loading...</Loader> : null}
        </Container>
    )
}

export default Coin;