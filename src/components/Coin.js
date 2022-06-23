import React, {useState} from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import {Link} from "react-router-dom"; 
import {UserAuth} from "../context/AuthenticationContext";
import { database } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import toast from 'react-hot-toast';

const Coin = ({ coin }) => {
  const [myCoin, setMyCoin] = useState(false);
  const {user} = UserAuth();

  const coinPath = doc(database, "users", `${user?.email}`);
  const saveCoin = async () => {
    if(user?.email) {
      setMyCoin(true);
      await updateDoc(coinPath, {
        myCoins: arrayUnion({
          id:coin.id,
          name:coin.name,
          image:coin.image,
          rank:coin.market_cap_rank,
          symbol:coin.symbol,
        }),
      });
    }else{
      notify();
    }
  }

  const notify = () => toast("Please sign in to save and view crypto coins", {
    style: {
      background: '#81E6BF',
    }
  });

  return (
    <tr className="h-[80px] border-b overflow-hidden">
      <td onClick={saveCoin}>
        {myCoin ? <AiFillStar/> : <AiOutlineStar />}
      </td>
      <td>{coin.market_cap_rank}</td>
      <td>
        <Link to={`/coin/${coin.id}`}>
          <div className="flex items-center">
            <img
              className="w-6 mr-2 rounded-full"
              src={coin.image}
              alt={coin.id}
            />
            <p className="hidden sm:table-cell">{coin.name}</p>
          </div>
        </Link>
      </td>
      <td>{coin.symbol.toUpperCase()}</td>
      <td>${coin.current_price.toLocaleString()}</td>
      <td>
        {coin.price_change_percentage_24h > 0 ? (
          <p className="text-green-600">{coin.price_change_percentage_24h.toFixed(2)}%</p>
        ) : (
          <p className="text-red-600">{coin.price_change_percentage_24h.toFixed(2)}%</p>
        )}
      </td>
      <td className="w-[180px] hidden md:table-cell">${coin.total_volume.toLocaleString()}</td>
      <td className="w-[180px] hidden sm:table-cell">${coin.market_cap.toLocaleString()}</td>
      <td>
        <Sparklines data={coin.sparkline_in_7d.price}>
          <SparklinesLine color="teal" />
        </Sparklines>
      </td>
    </tr>
  );
};

export default Coin;
