import type { NextApiRequest, NextApiResponse } from "next";
import { getCurrentEnergyPriceForHome, TibberHome } from "../../../lib/tibber";

export default async function CurrentElectricalPrice(req: NextApiRequest, res: NextApiResponse<TibberHome>) {
  const homeData = await getCurrentEnergyPriceForHome();

  res.status(200).json(homeData);
}
