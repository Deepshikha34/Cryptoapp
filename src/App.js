import React, { Component } from "react";
import "./App.css";
import { CoinList, Balance, CoinStatistics, SideBar } from "./components";
import { BiUserCircle } from "react-icons/bi";
import { coinExchangeServices } from "./services";
const coins = ["BTC", "LTC", "XRP", "DASH"];
//BTC https://s3.eu-central-1.amazonaws.com/bbxt-static-icons/type-id/png_16/f231d7382689406f9a50dde841418c64.png

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCoin: "",
      coinList: [],
    };
  }

  componentDidMount() {
    coinExchangeServices.getAllAssets().then((response) => {
      if (response.length > 0) {
        const finalCoin = [];
        coins.forEach((coin, index) => {
          const isAvailable = response.find((sCoin) => sCoin.asset_id === coin);
          if (isAvailable) finalCoin.push(isAvailable);
        });
        this.setState({
          coinList: finalCoin,
          selectedCoin: finalCoin[0].asset_id,
        });
      }
    });
  }

  selectCoin = (coin) => {
    this.setState({ selectedCoin: coin });
  };

  render() {
    const { selectedCoin, coinList } = this.state;
    console.log("SELECTED", selectedCoin);
    return (
      <div className="app">
        <SideBar />
        <main
          style={{
            backgroundColor: "#222227",
            width: "100%",
          }}
        >
          <header
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingBottom: "20px",
              boxShadow: "1px 2px 9px #F4AAB9",
            }}
          >
            <h1 style={{ color: "white", paddingLeft: "20px" }}>Sabertooth</h1>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                paddingRight: "150px",
              }}
            >
              <BiUserCircle size={30} color="#EA5350" />
              <h4 style={{ color: "white", marginLeft: 10 }}>User Name</h4>
            </div>
          </header>
          <div
            className="container-fluid"
            style={{
              marginTop: "40px",
              marginRight: "50px",
              marginLeft: "50px",
            }}
          >
            <div className="row">
              <div className="col-md-12">
                <span style={{ fontSize: 18, color: "#513D65" }}>
                  Welcome Back ,
                </span>
                <span style={{ fontSize: 20, color: "white" }}> User Name</span>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <CoinList selectCoin={this.selectCoin} {...{ coinList }} />
              </div>
              <div className="col-md-6">
                {selectedCoin != "" && <CoinStatistics {...{ selectedCoin }} />}{" "}
              </div>
              <div className="col-md-3">
                <Balance {...{ selectedCoin }} />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
