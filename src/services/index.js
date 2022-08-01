import { authHeader } from "../_helper";
export const coinExchangeServices = {
  getAllIcons,
  getAllAssets,
  getCoinTimeDate,
};

const hostname = "https://rest.coinapi.io/";
function getAllIcons(iconSize = 16) {
  const requestOptions = { method: "GET", headers: authHeader() };
  return fetch(`${hostname}v1/assets/icons/${iconSize}`, requestOptions);
}

function getAllAssets() {
  const requestOptions = { method: "GET", headers: authHeader() };
  return fetch(`${hostname}v1/assets`, requestOptions).then((response) =>
    response.json()
  );
}
// /exchangerate/BTC/USD/history?period_id=1MIN&time_start=2016-01-01T00:00:00&time_end=2016-02-01T00:00:00
function getCoinTimeDate(coin, dStart, dEnd, timeInterval = "15MIN") {
  const requestOptions = { method: "GET", headers: authHeader() };
  return fetch(
    `${hostname}v1/exchangerate/${coin}/USD/history?period_id=${timeInterval}&time_start=${dStart}&time_end=${dEnd}`,
    requestOptions
  ).then((response) => response.json());
}
