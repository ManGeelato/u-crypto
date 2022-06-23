import React, { useState, useEffect } from "react";
import axios from "axios";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { FaTwitter, FaFacebook } from "react-icons/fa";
import DOMPurify from "dompurify";
import {useParams} from 'react-router-dom';
 
function Crypto() {
  const params = useParams();
  const [crypto, setCrypto] = useState({});

  const cryptoUrl =
    `https://api.coingecko.com/api/v3/coins/${params.coinId}?localization=false&sparkline=true`;

  useEffect(() => {
    axios.get(cryptoUrl).then((response) => {
      setCrypto(response.data);
    });
  }, [cryptoUrl]);

  return (
    <div className="rounded-div my-12 py-8">
      <div className="flex py-8">
        <img className="w-20 mr-8" src={crypto.image?.large} alt="cryptoImage" />
        <div>
          <p className="text-3xl font-bold">{crypto?.name}</p>
          <p>({crypto.symbol?.toUpperCase()} / USD)</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="flex justify-between">
            {crypto.market_data?.current_price ? (
              <p className="text-3xl font-bold">${crypto.market_data.current_price.usd.toLocaleString()}</p>
            ) : null}
            <p>7 days</p>
          </div>
          <div>
            <Sparklines data={crypto.market_data?.sparkline_7d.price}>
              <SparklinesLine color="teal" />
            </Sparklines>
          </div>
          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-500 text-sm">Market Cap</p>
              {crypto.market_data?.market_cap ? (
                <p>${crypto.market_data.market_cap.usd.toLocaleString()}</p>
              ) : null}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Volume (24hr)</p>
              {crypto.market_data?.market_cap ? (
                <p>${crypto.market_data.total_volume.usd.toLocaleString()}</p>
              ) : null}
            </div>
          </div>

          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-500 text-sm">(24hr) High</p>
              {crypto.market_data?.high_24h ? (
                <p>${crypto.market_data.high_24h.usd.toLocaleString()}</p>
              ) : null}
            </div>
            <div>
              <p className="text-red-500 text-sm">(24hr) Low</p>
              {crypto.market_data?.low_24h ? (
                <p className="text-red-500">${crypto.market_data.low_24h.usd.toLocaleString()}</p>
              ) : null}
            </div>
          </div>
        </div>
        <div>
          <p>Stats</p>
          <div>
            <div>
              <p>Rank:</p>
              {crypto.market_cap_rank}
            </div>
            <div>
              <p>Algorithm:</p>
              {crypto.hashing_algorithm ? (
                <p>{crypto.hashing_algorithm}</p>
              ) : null}
            </div>
            <div>
              <p>Trust Score:</p>
              {crypto.tickers ? (
                <p>{crypto.liquidity_score.toFixed(2)}</p>
              ) : null}
            </div>
          </div>

          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-500 text-sm">Price Change (Last 24 hours)</p>
              {crypto.market_data ? (
                <p>
                  {crypto.market_data.price_change_percentage_24h.toFixed(2)}%
                </p>
              ) : null}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Price Change (Last 7 Days)</p>
              {crypto.market_data ? (
                <p>
                  {crypto.market_data.price_change_percentage_7d.toFixed(2)}%
                </p>
              ) : null}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Price Change (Last 14 Days)</p>
              {crypto.market_data ? (
                <p>
                  {crypto.market_data.price_change_percentage_14d.toFixed(2)}%
                </p>
              ) : null}
            </div>
          </div>
          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-500 text-sm">Price Change(Last 30 Days)</p>
              {crypto.market_data ? (
                <p>
                  {crypto.market_data.price_change_percentage_30d.toFixed(2)}%
                </p>
              ) : null}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Price Change(Last 60 Days)</p>
              {crypto.market_data ? (
                <p> 
                  {crypto.market_data.price_change_percentage_60d.toFixed(2)}%
                </p>
              ) : null}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Price Change(Last 1 Year)</p>
              {crypto.market_data ? (
                <p>
                  {crypto.market_data.price_change_percentage_1y.toFixed(2)}%
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex justify-around p-8 text-accent">
            <a
              href="https://twitter.com/coingecko?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
              target="_blank"
              rel="noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.facebook.com/coingecko/"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebook />
            </a>
          </div>
        </div>
      </div>

      <div className="py-4">
        <p className="text-xl font-bold">About: {crypto.name}</p>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              crypto.description ? crypto.description.en : ""
            ),
          }}
        ></p>
      </div>
    </div>
  );
}

export default Crypto;
