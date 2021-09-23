import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CoinsContext from "../context/coins/CoinsContext";

import { BsStar } from "react-icons/bs";

import { Image, Table, Spinner, Container } from "react-bootstrap";

const TableCoin = () => {
  const { coins, getCoins, getCoin } = useContext(CoinsContext);

  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    getCoins();
    setSpinner(false);
  }, []);

  const spin = (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );

  return (
    <Container>
      {spinner ? (
        spin
      ) : (
        <Table
          responsive
          className="fw-bold"
          style={{
            background: "#282a36",
            color: "#DDDDDD",
            border: "3px solid #44475a",
            fontSize: ".9rem",
          }}
        >
          <thead style={{ background: "#30475E" }}>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Simbolo</th>
              <th>Precio</th>
              <th>24H</th>
              <th>Volumen</th>
              <th>Cap. del mercado</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => {
              return (
                <tr key={coin.id} className="bg-dark">
                  <td className="py-4 d-flex justify-content-around align-items-center">
                    <BsStar className="fs-5" />
                    {coin.market_cap_rank}
                  </td>
                  <td className="py-4">
                    <Image
                      className="mx-2"
                      src={coin.image}
                      height={20}
                      width={20}
                    />

                    <Link to={`/coins/${coin.id}`} className="text-white"
                    onClick={()=> getCoin(coin.id)} >
                      {coin.name}
                    </Link>
                  </td>
                  <td className="text-muted py-4">
                    {coin.symbol.toUpperCase()}
                  </td>
                  <td className="py-4">{coin.current_price} USD$</td>
                  {coin.price_change_percentage_24h > 0 ? (
                    <td className="text-success py-4">
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </td>
                  ) : (
                    <td className="text-danger py-4">
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </td>
                  )}
                  <td className="py-4">
                    {new Intl.NumberFormat().format(coin.total_volume)} USD$
                  </td>
                  <td className="py-4">
                    {new Intl.NumberFormat().format(coin.market_cap)} USD$
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default TableCoin;
