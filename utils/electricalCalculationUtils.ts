import { ENERGY_CONSTANTS } from "@/constants/energyConstants";
import { formatCurrency } from "./currencyFormat";

// Calculates shower price based on following inputs
// Energy cost per kWh
// Shower length in minutes
// Shower volume in liters per minutes
// Shower power per liter in kWh
export const getShowerPrice = (
  energyCost: number,
  showerLength: number = ENERGY_CONSTANTS.DEFAULT_SHOWER_LENGTH_IN_MINUTES,
  showerVolume: number = ENERGY_CONSTANTS.DEFAULT_SHOWER_VOLUME_IN_LITERS_PER_MINUTE,
  showerPower: number = ENERGY_CONSTANTS.DEFAULT_SHOWER_POWER_CONSUMPTION_PER_LITER_IN_KWH
) => {
  const kWhPerMinute = showerVolume * showerPower;
  const energyConsumption = kWhPerMinute * showerLength;
  return formatCurrency(energyCost * energyConsumption);
};
