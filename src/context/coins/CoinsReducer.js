import { GET_COINS, GET_COIN } from "../types";

export default function (actualState, action) {
  const { payload, type } = action;

  switch (type) {
    case GET_COINS:
      return {
        ...actualState,
        coins: payload,
      };
      case GET_COIN:
      return {
        ...actualState,
        selectCoin: payload,
      };
    default:
      return actualState;
  }
}