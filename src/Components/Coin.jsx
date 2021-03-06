import React, { useContext, useState } from "react";
import CoinsContext from "../context/coins/CoinsContext";

import { CopyToClipboard } from "react-copy-to-clipboard";

import { Container, Card, Image } from "react-bootstrap";

const Coin = () => {

  const { selectCoin } = useContext(CoinsContext);

  const [copied, setCopied] = useState(false);

  return (
    <Container>
      {selectCoin ? (
        <div>
          <h3 className="py-3 text-uppercase fw-bold">
            <span style={{ color: "rgb(97, 136, 255)" }}>{selectCoin?.name}</span>
          </h3>
          <Card
            style={{backgroundColor :"#121212", borderRadius: "10px"}}
            key={selectCoin?.id}
            text="white"
            className="mb-2 shadow"
          >
            <div className="d-flex align-items-center">
              <Image
                className="border-white"
                src={selectCoin?.image.large}
                height={80}
                width={80}
              />

              <Card.Header as="h4" className="text-uppercase">{selectCoin?.symbol}</Card.Header>

              <h6 className="my-auto" style={{ color: "rgb(97, 136, 255)" }}>
                Rank {selectCoin?.market_cap_rank}
              </h6>
            </div>
            <Card.Body>
              <div className="d-flex align-items-center">
                <div>
                  <p className="fs-5 fw-bold">Precio actual</p>
                  {selectCoin?.market_data.current_price.usd > 0 ? (
                    <p className="fw-bold text-success">
                      {selectCoin?.market_data.current_price.usd} $
                    </p>
                  ) : (
                    <p className="fw-bold text-danger">
                      {selectCoin?.market_data.current_price.usd} $
                    </p>
                  )}
                </div>
                <div className="vr mx-2" /> 
                <div>
                  <p className="fs-5 fw-bold">Cap.de Mercado</p>
                  <p className="fw-bold">
                    {new Intl.NumberFormat().format(
                      selectCoin?.market_data.market_cap.usd
                    )} $
                  </p>
                </div>
                <div className="vr mx-2" /> 
                <div>
                  <p className="fs-5 fw-bold">Volumen en 24H</p>
                  <p className="fw-bold">
                    {new Intl.NumberFormat().format(
                      selectCoin?.market_data.total_volume.usd
                    )} $
                  </p>
                </div>
              </div>
              <div>
                {selectCoin?.platforms["binance-smart-chain"] === undefined ? (
                  ""
                ) : (
                  <div className="d-flex align-items-center mb-2">
                    <div>
                      <p className="fs-5 fw-bold">Contrato:</p>

                      <input
                        className="p-3 input-form text-white"
                        type="text"
                        value={selectCoin?.platforms["binance-smart-chain"]}
                        readOnly
                        style={{ width: "250px", borderRadius: "5px" }}
                      />

                      <CopyToClipboard
                        className="mx-2"
                        text={selectCoin?.platforms["binance-smart-chain"]}
                        onCopy={() => setCopied(true)}
                      >
                        <button
                          style={{
                            background: "#1597BB",
                            border: "none",
                            padding: "10px",
                            borderRadius: "5px",
                          }}
                        >
                          <span className="text-white">
                            {!copied ? "Copiar" : "??Copiado!"}
                          </span>
                        </button>
                      </CopyToClipboard>
                    </div>
                  </div>
                )}
              </div>
              <Card.Title className="fs-5 fw-bold">Informacion</Card.Title>
              <Card.Text>
                <p>Fecha de creaci??n {selectCoin?.genesis_date}</p>
              </Card.Text>
              <Card.Text>
                <p className="fs-5 fw-bold">Pagina oficial</p>
                <a href={selectCoin?.links.homepage} target="_blank">
                  {selectCoin?.links.homepage}
                </a>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      ) : (
        <h5>No coin selected</h5>
      )}
    </Container>
  );
};

export default Coin;
