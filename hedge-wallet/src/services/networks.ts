import axios from 'axios';

export const getNetworkData = async (network: string) => {
  return (await axios.get(`https://chains.cosmos.directory/${network}`)).data;
};

export const getMainNetDetails = async (chain_id: string) => {
  try {
    return (await axios.get(`https://chains.cosmos.directory/${chain_id}`))
      .data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getTestNetDetails = async (chain_name: string) => {
  try {
    return (
      await axios.get(`https://chains.testcosmos.directory/${chain_name}`)
    ).data;
  } catch (err) {
    throw new Error(err);
  }
};

export const convertOneCurrencyToOther = async (
  fromCurrency: string,
  toCurrency: string
): Promise<number> => {
  try {
    return await (
      await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${fromCurrency}&vs_currencies=${toCurrency}`
      )
    ).data[fromCurrency][toCurrency];
  } catch (err) {
    try {
      const response = await getNetworkData(fromCurrency);
      const symbol = response.chain.display;

      return Number(
        Number(response.chain.prices.coingecko[symbol].usd) *
          Number(await convertOneCurrencyToOther('usd', toCurrency))
      );
    } catch (err) {
      return 0;
    }
  }
};

//`https://api.coingecko.com/api/v3/simple/price?ids=${chain_name}&vs_currencies=usd,eur,jpy,gbp,cad,aud,chf,sek,nzd,mxn,sgd,hkd,nok,krw,try,thb,brl,php,idr,myr,zar,inr,cny,dkk,pln,rub,huf,ils,clp,ars,ngn,aed,bdt,bhd,bmd,czk,kwd,lkr,pkr,sar,twd,uah,vef,vnd,btc,xag,xau`
