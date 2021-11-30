import { TibberHome } from "@/lib/tibber";
import { getShowerPrice } from "@/utils/electricalCalculationUtils";
import fetcher from "@/utils/swrUtils";
import useSwr from "swr";

type ShowerPriceCalculatorProps = {
  currentEnergyPriceFallbackData: TibberHome;
};

const ShowerPriceCalculator = ({ currentEnergyPriceFallbackData }: ShowerPriceCalculatorProps) => {
  const { data: currentEnergyPrice } = useSwr<TibberHome>("/api/tibber/current-energy-price", fetcher, {
    fallbackData: currentEnergyPriceFallbackData,
    refreshInterval: 300000,
    revalidateOnMount: true,
  });

  return (
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
  );
};

export default ShowerPriceCalculator;
