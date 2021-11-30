import { ShowerPriceCalculator } from "@/components/shower-price";
import { getCurrentEnergyPriceForHome, TibberHome } from "@/lib/tibber";
import type { GetServerSideProps, NextPage } from "next";

type HomeProps = {
  children: React.ReactNode;
  currentEnergyPriceServerData: TibberHome;
};

const Home: NextPage = ({ currentEnergyPriceServerData }: HomeProps) => {
  return (
    <>
      <ShowerPriceCalculator currentEnergyPriceFallbackData={currentEnergyPriceServerData} />
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
