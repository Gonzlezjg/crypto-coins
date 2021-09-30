import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CoinsContext from "../context/coins/CoinsContext";

import { BsStar } from "react-icons/bs";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

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
        variant="dark"
          hover
          responsive
          className="fw-bold shadow"
          style={{
            color: "#DDDDDD",
            border: "3px solid #222831",
            fontSize: ".9rem",
          }}
        >
          <thead style={{ borderBottom: "4px solid #222831" }}>
            <tr>
              <th className="text-center">#</th>
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
                <tr key={coin.id} className="text-white">
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
                      <MdArrowDropUp />
                    </td>
                  ) : (
                    <td className="text-danger py-4">
                      {coin.price_change_percentage_24h.toFixed(2)}%
                       < MdArrowDropDown />
                    </td>
                  )}
                  <td className="py-4">
                    {new Intl.NumberFormat().format(coin.total_volume)}
                    <span className="fw-bold mx-1" style={{color: "#03506f"}}>USD$</span>
                  </td>
                  <td className="py-4">
                    {new Intl.NumberFormat().format(coin.market_cap)}
                    <span className="fw-bold mx-1" style={{color: "#03506f"}}>USD$</span>
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
