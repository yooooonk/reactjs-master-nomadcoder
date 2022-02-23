import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';

interface ChartProps {
  coinId: string;
}

interface HistoricalData {
  time_open: Date;
  time_close: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

const Chart = ({ coinId }: ChartProps) => {
  const { isLoading, data } = useQuery<HistoricalData[]>(['ohlcv', coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <div>
      {isLoading ? (
        'Loading Chart...'
      ) : (
        <ApexChart
          options={{
            chart: { height: 500, width: 500 },
            theme: { mode: 'dark' },
            stroke: { curve: 'smooth', width: 4 },
          }}
          type='line'
          series={[{ name: 'sales', data: data?.map((price) => price.close) }]}
          width='500'
        />
      )}
    </div>
  );
};

export default Chart;
