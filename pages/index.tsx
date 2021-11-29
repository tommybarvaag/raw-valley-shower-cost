import type { GetServerSideProps, NextPage } from "next";
import { getCurrentEnergyPriceForHome, TibberHome } from "../lib/tibber";
import { getShowerPrice } from "../utils/electricalCalculationUtils";

type HomeProps = {
  children: React.ReactNode;
  currentEnergyPrice: TibberHome;
};

const Home: NextPage = ({ currentEnergyPrice }: HomeProps) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "4px",
        }}
      >
        <div>Current shower price in raw valley:</div>
        <div
          style={{
            fontWeight: "bold",
          }}
        >
          {getShowerPrice(currentEnergyPrice.currentSubscription.priceInfo.current.total)}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      currentEnergyPrice: await getCurrentEnergyPriceForHome(),
    },
  };
};

export default Home;
