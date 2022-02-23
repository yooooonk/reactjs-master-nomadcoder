import styled from 'styled-components';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchCoins } from '../api';
import { useSetRecoilState } from 'recoil';
import { isDarkAtom } from '../atoms';

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

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.textColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 1rem;
  a {
    transition: color 0.2s ease-in;
    display: block;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 2rem;
`;

const Loader = styled.span`
  text-align: center;
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

const CoinWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
`;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const setIsDark = useSetRecoilState(isDarkAtom);
  const { data, isLoading } = useQuery<CoinInterface[]>('allCoins', fetchCoins);

  const toggleTheme = () => setIsDark((prev) => !prev);
  return (
    <Container>
      <Header>
        <Title>코인</Title>
        <button onClick={toggleTheme}>Toggle mode</button>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => {
            return (
              <Coin key={coin.id}>
                <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                  <CoinWrapper>
                    <Img
                      src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                    />
                    {coin.name} &rarr;
                  </CoinWrapper>
                </Link>
              </Coin>
            );
          })}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
