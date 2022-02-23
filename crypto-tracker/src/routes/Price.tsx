interface PriceProps {
  coinId: string;
}

const Price = (props: PriceProps) => {
  const { coinId } = props;
  return <h1>price</h1>;
};

export default Price;
