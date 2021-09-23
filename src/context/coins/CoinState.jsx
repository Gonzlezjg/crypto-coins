import React, { useReducer } from "react";
import axios from "axios";

import CoinsReducer from "./CoinsReducer";
import CoinsContext from "./CoinsContext";

const CoinState = (props) => {
  const initialState = {
    coins: [],
    selectCoin: null,
  };

  const url = `https://api.coingecko.com/api/v3/coins`;

  const [state, dispatch] = useReducer(CoinsReducer, initialState);

  const getCoins = async() => {
    
    const response = await axios.get(`${url}/markets?vs_currency=usd&order=market_cap_desc&per_page=50`)
    
    dispatch({
      type: "GET_COINS",
      payload: response.data,
    })
  };

  const getCoin = async(id) => {

    const response = await axios.get(`${url}/${id}`);

    dispatch({
      type: "GET_COIN",
      payload: response.data,
    })
  };

  return (
    <CoinsContext.Provider
      value={{
        coins: state.coins,
        selectCoin: state.selectCoin,
        getCoins,
        getCoin,
      }}
    >
      {props.children}
    </CoinsContext.Provider>
  );
};

export default CoinState;