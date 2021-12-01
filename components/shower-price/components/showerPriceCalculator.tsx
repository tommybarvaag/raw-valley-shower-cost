import {
  Flex,
  RangeField,
  RangeFieldRange,
  RangeFieldThumb,
  RangeFieldTrack,
  Text
} from "@/components/ui";
import { ENERGY_CONSTANTS } from "@/constants/energyConstants";
import { TibberHome } from "@/lib/tibber";
import { getShowerPrice } from "@/utils/electricalCalculationUtils";
import fetcher from "@/utils/swrUtils";
import React from "react";
import { CSS } from "stitches.config";
import useSwr from "swr";

type ShowerPriceCalculatorProps = {
  currentEnergyPriceFallbackData: TibberHome;
  css?: CSS;
};

const ShowerPriceCalculator = ({
  currentEnergyPriceFallbackData,
  ...other
}: ShowerPriceCalculatorProps) => {
  const [showerLengthInMinutes, setShowerLengthInMinutes] = React.useState<number>(
    ENERGY_CONSTANTS.DEFAULT_SHOWER_LENGTH_IN_MINUTES
  );

  const { data: currentEnergyPrice } = useSwr<TibberHome>(
    "/api/tibber/current-energy-price",
    fetcher,
    {
      fallbackData: currentEnergyPriceFallbackData,
      refreshInterval: 300000,
      revalidateOnMount: true
    }
  );

  const showerPrice = React.useMemo(
    () =>
      getShowerPrice(
        currentEnergyPrice.currentSubscription.priceInfo.current.total,
        showerLengthInMinutes
      ),
    [currentEnergyPrice.currentSubscription.priceInfo, showerLengthInMinutes]
  );

  return (
    <Flex
      direction="column"
      alignItems="center"
      css={{
        my: "$5"
      }}
      {...other}
    >
      <Text></Text>
      <Flex gap="3" alignItems="center">
        <Text
          size={{
            "@initial": "9",
            "@bp1": "12"
          }}
          fontWeight="bold"
        >
          {showerLengthInMinutes}{" "}
        </Text>
        <Text
          size={{
            "@initial": "6",
            "@bp1": "8"
          }}
        >
          minutes in the shower
        </Text>
      </Flex>
      <form>
        <RangeField
          name="minutes"
          defaultValue={[showerLengthInMinutes]}
          max={30}
          min={3}
          step={1}
          onValueChange={value => setShowerLengthInMinutes(value[0])}
          aria-label="Minutes in shower"
          css={{
            my: "$5"
          }}
        >
          <RangeFieldTrack>
            <RangeFieldRange />
          </RangeFieldTrack>
          <RangeFieldThumb></RangeFieldThumb>
        </RangeField>
      </form>
      <Flex gap="3" alignItems="center">
        <Text
          size={{
            "@initial": "6",
            "@bp1": "8"
          }}
        >
          costs
        </Text>
        <Text
          size={{
            "@initial": "9",
            "@bp1": "12"
          }}
          fontWeight="bold"
        >
          {showerPrice}
        </Text>
      </Flex>
    </Flex>
  );
};

export default ShowerPriceCalculator;
