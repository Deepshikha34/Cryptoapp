import React from "react";

class CoinList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coinList: [],
    };
  }

  render() {
    const { selectCoin, coinList } = this.props;
    return (
      <div>
        {Array.isArray(coinList) &&
          coinList.length > 0 &&
          coinList.map((coin, index) => (
            <div
              className="row coin-container"
              style={{
                backgroundColor: "#2C2C32",
                boxShadow: "1px 2px 9px #F4AAB9",
                cursor: "pointer",
              }}
              onClick={() => selectCoin(coin.asset_id)}
            >
              <div className="col-md-3"></div>
              <div className="col-md-4 coin-title">{coin.name}</div>
              <div className="col-md-5">
                <div className="row">
                  <div className="col-md-12" style={{ color: "white" }}>
                    1 {coin.asset_id}
                  </div>
                  <div className="col-md-12" style={{ color: "#80808E" }}>
                    {coin.price_usd.toFixed(2)} USD
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

export { CoinList };
