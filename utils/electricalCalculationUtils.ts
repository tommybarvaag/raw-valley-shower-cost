import { formatCurrency } from "./currencyFormat";

// Calculates shower price based on following inputs
// Energy cost per kWh
// Shower length in minutes
// Shower volume in liters per minutes
// Shower power per liter in kWh
export const getShowerPrice = (energyCost: number, showerLength: number = 10, showerVolume: number = 16, showerPower: number = 0.035) => {
  const kWhPerMinute = showerVolume * showerPower;
  const energyConsumption = kWhPerMinute * showerLength;
  return formatCurrency(energyCost * energyConsumption);
};
