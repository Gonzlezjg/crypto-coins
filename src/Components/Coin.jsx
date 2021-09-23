import React, { useContext, useState } from "react";
import CoinsContext from "../context/coins/CoinsContext";

import { CopyToClipboard } from "react-copy-to-clipboard";

import {
  Container,
  Card,
  DropdownButton,
  Dropdown,
  Image,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";

const Coin = () => {
  const { selectCoin } = useContext(CoinsContext);

  const [copied, setCopied] = useState(false);

  return (
    <Container>
      {selectCoin ? (
        <div>
          <h3 className="py-3">
            Mas sobre{" "}
            <span style={{ color: "#F05454" }}>{selectCoin.name}</span>{" "}
          </h3>
          <Card bg="dark" key={selectCoin.id} text="white" className="mb-2">
            <div className="d-flex align-items-center">
              <Image src={selectCoin.image.large} height={80} width={80} />

              <Card.Header as="h5">{selectCoin.name}</Card.Header>

              <h6 className="my-auto text-danger">
                Rank {selectCoin.market_cap_rank}
              </h6>
            </div>
            <Card.Body>
              <Card.Title>Informacion</Card.Title>
              <Card.Text>
                <p>Fecha de creación {selectCoin.genesis_date}</p>
                <div className="d-flex align-items-center">
                  <div>
                    <p>Contrato: </p>

                    <input
                      className="py-2"
                      type="text"
                      value={selectCoin.platforms["binance-smart-chain"]}
                      readonly
                      style={{ width: "250px", borderRadius: "5px"}}
                    />

                    <CopyToClipboard
                      className="mx-2 "
                      text={selectCoin.platforms["binance-smart-chain"]}
                      onCopy={() => setCopied(true)}
                    >
                      <Button className="btn btn-danger ">
                        <span className="text-white">
                          { !copied ? "Copiar" :  "¡Copiado!" }
                        </span>
                      </Button>
                    </CopyToClipboard>
                  </div>
                </div>
              </Card.Text>
              <DropdownButton id="dropdown-basic-button" title="links">
                <Dropdown.Item href="#/action-1">
                  {selectCoin.links.homepage}
                </Dropdown.Item>
              </DropdownButton>
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
