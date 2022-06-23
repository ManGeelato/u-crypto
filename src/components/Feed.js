/* eslint-disable array-callback-return */
import React, { useState } from "react";
import Coin from "../components/Coin";

function Feed({ cryptoCoins }) {
  const [search, setSearch] = useState("");

  return (
    <div className="rounded-div my-4">
      <div className="flex flex-col md:flex-row justify-between pt-4 pb-6 text-center md:text-right">
        <h2 className="text-2xl font-bold my-2">Search: </h2>
        <form>
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            placeholder="search crypto coin..."
            className="w-full bg-primary border border-input px-4 py-2 rounded-2xl shadow-xl"
          />
        </form>
      </div>
      <table className="w-full border-collapse text-center">
        <thead>
          <tr className="border-b">
            <th></th>
            <th className="px-4">#</th>
            <th className="text-left">Coin</th>
            <th>Symbol</th>
            <th>Cost</th>
            <th>24hr</th>
            <th className="hidden md:table-cell">24hr Volume</th>
            <th className="hidden md:table-cell">Market</th>
            <th>Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {cryptoCoins
            .filter((value) => {
              if (search === "") {
                return value;
              } else if (
                value.name.toLowerCase().includes(search.toLowerCase())
              ) {
                return value;
              }
            })
            .map((coin) => (
              <Coin coin={coin} key={coin.id} />
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Feed;
