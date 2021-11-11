import React, { useEffect, useState } from "react";
import axios from "axios";

const TopBarData = () => {
  const [data, setData] = useState('');
  const url = `https://api.coingecko.com/api/v3/global`;

  useEffect( async() => {
    await axios
      .get(url)
      .then((res) =>  res)
      .then((d) => setData(d.data.data));
  }, [url]);

  const {
    markets,
    active_cryptocurrencies,
    total_market_cap,
    total_volume,
    market_cap_percentage,
  } = data;

  return (
    <div className="w-100 px-2 d-flex topBar justify-content-center ">
      <div className="my-auto h-50 d-flex ">
        <div>
          <p>
            Monedas: <span style={{color: "rgb(97, 136, 255)"}}>{data && active_cryptocurrencies} $</span>
          </p>
        </div>
        <div className="mx-2">
          <p>
            Mercados: <span style={{color: "rgb(97, 136, 255)"}}>{data &&markets} $</span>{" "}
          </p>
        </div>
        <div>
          <p>
            Cap.de mercado:{" "}
            <span style={{color: "rgb(97, 136, 255)"}}>
              {new Intl.NumberFormat().format(data && total_market_cap.usd)} $
            </span>{" "}
          </p>
        </div>
        <div className="mx-2">
          <p>
            Volumen en 24H:{" "}
            <span style={{color: "rgb(97, 136, 255)"}}>{new Intl.NumberFormat().format(data && total_volume.usd)} $</span>{" "}
          </p>
        </div>
        <div className="d-flex">
          <p className="mx-2">
            Dominio del mercado:{" "}
            <span style={{color: "rgb(97, 136, 255)"}}>BTC { data && market_cap_percentage.btc.toFixed(2)}</span> %
          </p>
          <p>
            {" "}
            <span style={{color: "rgb(97, 136, 255)"}}>ETH {data && market_cap_percentage.eth.toFixed(2)}</span> %
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopBarData;
