export type TibberCurrentEnergyPrice = {
  data: TibberData;
};

export type TibberData = {
  viewer: TibberViewer;
};

export type TibberViewer = {
  homes: TibberHome[];
};

export type TibberHome = {
  id: string;
  currentSubscription: TibberCurrentSubscription;
};

export type TibberCurrentSubscription = {
  priceInfo: TibberPriceInfo;
};

export type TibberPriceInfo = {
  current: TibberPriceData;
  today: TibberPriceData[];
  tomorrow: TibberPriceData[];
};

export type TibberPriceData = {
  total: number;
  energy: number;
  tax: number;
  startsAt: Date;
};

const currentEnergyPriceQuery = {
  query: `{
        viewer {
            homes {
                id,
                currentSubscription {
                    priceInfo {
                        current {
                            total
                            energy
                            tax
                            startsAt
                        }
                        today {
                            total
                            energy
                            tax
                            startsAt
                        }
                        tomorrow {
                            total
                            energy
                            tax
                            startsAt
                        }
                    }
                }
            }
        }
    }
    `,
  variables: null,
  operationName: null,
};

export const getCurrentEnergyPrice = async (): Promise<TibberCurrentEnergyPrice> => {
  const url: string = process.env.TIBBER_API_BASE_URL as string;

  const res: Response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TIBBER_ACCESS_TOKEN}`,
    },
    body: JSON.stringify(currentEnergyPriceQuery),
  });

  const data: TibberCurrentEnergyPrice = await res.json();

  return data;
};

export const getCurrentEnergyPriceForHome = async (homeId?: string): Promise<TibberHome> => {
  const currentEnergyPrice: TibberCurrentEnergyPrice = await getCurrentEnergyPrice();

  const home: TibberHome = currentEnergyPrice?.data?.viewer?.homes?.find((tibberHome: TibberHome) => tibberHome.id === (homeId ?? process.env.TIBBER_HOME_ID));

  return home;
};
