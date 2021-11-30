import type { GetServerSideProps, NextPage } from "next";
import useSwr from "swr";
import { getCurrentEnergyPriceForHome, TibberHome } from "../lib/tibber";
import { getShowerPrice } from "../utils/electricalCalculationUtils";
import fetcher from "../utils/swrUtils";

type HomeProps = {
  children: React.ReactNode;
  currentEnergyPriceServerData: TibberHome;
};

const Home: NextPage = ({ currentEnergyPriceServerData }: HomeProps) => {
  const { data: currentEnergyPrice } = useSwr<TibberHome>("/api/tibber/current-energy-price", fetcher, {
    fallbackData: currentEnergyPriceServerData,
    refreshInterval: 300000,
    revalidateOnMount: true,
  });

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
      currentEnergyPriceServerData: await getCurrentEnergyPriceForHome(),
    },
  };
};

export default Home;
