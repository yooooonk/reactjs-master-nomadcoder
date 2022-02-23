import { Link, Route, Routes, useMatch, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { fetchCoinInfo, fetchCoinTickers } from '../api';
import Chart from './Chart';
import Price from './Price';

const Container = styled.div`
  padding: 1rem;
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
  color: ${(props) => props.theme.accentColor};
  font-size: 2rem;
`;
const Loader = styled.span`
  text-align: center;
`;

const Overview = styled.div`
  display: flex;
  background-color: black;
  padding: 1.5rem;
  border-radius: 1rem;
  justify-content: space-between;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span:first-child {
    font-size: 12px;
  }
`;

const Description = styled.div`
  margin: 1rem 0;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: black;
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) => (props.isActive ? props.theme.accentColor : props.theme.textColor)};

  a {
    display: block;
  }
`;

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  tags: Tag[];
  //team: Team[];
  description: string;
  message: string;
  open_source: boolean;
  started_at: Date;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  //links: Links;
  //links_extended: LinksExtended[];
  //whitepaper: Whitepaper;
  first_data_at: Date;
  last_data_at: Date;
}

export interface Tag {
  id: string;
  name: string;
  coin_counter: number;
  ico_counter: number;
}

export interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: Date;
  last_updated: Date;
  quotes: Quotes;
}

export interface Quotes {
  USD: Usd;
}

export interface Usd {
  price: number;
  volume_24h: number;
  volume_24h_change_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  percent_change_15m: number;
  percent_change_30m: number;
  percent_change_1h: number;
  percent_change_6h: number;
  percent_change_12h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_1y: number;
  ath_price: number;
  ath_date: Date;
  percent_from_price_ath: number;
}

function Coin() {
  const { coinId = '' } = useParams<'coinId'>();

  const chartMatch = useMatch(':coinId/chart');
  const priceMatch = useMatch(':coinId/price');

  const { data: infoData, isLoading: infoLoading } = useQuery<InfoData>(
    ['coinInfo', coinId],
    () => fetchCoinInfo(coinId)
  );
  const { data: tickerData, isLoading: tickerLoading } = useQuery<PriceData>(
    ['coinTickers', coinId],
    () => fetchCoinTickers(coinId)
  );

  return (
    <Container>
      <Header>
        <Title>{infoLoading ? 'Loading...' : infoData?.name}</Title>
      </Header>
      {tickerLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>RANK:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>SYMBOL:</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>OPEN SOURCE:</span>
              <span>{infoData?.open_source ? 'Yes' : 'No'}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>TOTAL SUPPLY:</span>
              <span>{tickerData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>MAX SUPPLY:</span>
              <span>{tickerData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>
          <Routes>
            <Route path='chart' element={<Chart coinId={coinId} />} />
            <Route path='price' element={<Price coinId={coinId} />} />
          </Routes>
        </>
      )}
    </Container>
  );
}

export default Coin;
