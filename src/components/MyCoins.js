import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import {AiTwotoneDelete} from 'react-icons/ai';
import {doc,onSnapshot, updateDoc} from "firebase/firestore";
import {database} from "../firebase";
import {UserAuth} from "../context/AuthenticationContext";
import toast from 'react-hot-toast';


const MyCoins = () => {
    const [crypto, setCrypto] = useState([]);
    const {user} = UserAuth();

    useEffect(() => {
        onSnapshot(doc(database, "users", `${user?.email}`), (doc) => {
            setCrypto(doc.data()?.myCoins);
        })
    }, [user?.email])
    
    const coinPath = doc(database, "users", `${user?.email}`);

    const deleteCoin = async (passedId) => {
        try{
            await notify();
            const result = crypto.filter((item) => item.id !== passedId);
            await updateDoc(coinPath, {
                myCoins: result
            })
        }catch(err){
            console.log(err);
        }
    }

    const notify = async () => toast("Crypto coin deleted successfully!", {
        style: {
          background: 'red',
        }
    });
    
  return (
    <div>
        {crypto?.length === 0 ? (<p>
            No crypto available, please save a coin to add it to your account.&nbsp;
            <Link to="/">Search a coin</Link>

        </p>) : (
            <table className="w-full border-collapse text-center">
                <thead>
                    <tr className="border-b">
                        <th className="px-4">Rank #</th>
                        <th className="text-left">Name</th>
                        <th className="text-left">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {crypto?.map((coin) => (
                        <tr key={coin.id} className="h-[60px] overflow-hidden">
                            <td>{coin?.rank}</td>
                            <td>
                                <Link to={`/coin/${coin.id}`}>
                                    <div className="flex items-center">
                                        <img className="w-8 mr-4" src={coin?.image} alt="/" />
                                        <div>
                                            <p className="hidden sm:table-cell">{coin?.name}</p>
                                            <p className="text-gray-500 text-left text-sm">{coin?.symbol.toUpperCase()}</p>
                                        </div>
                                    </div>
                                </Link>
                            </td>
                            <td className="pl-8">
                                <AiTwotoneDelete onClick={() => deleteCoin(coin.id)} className="cursor-pointer text-red-500"/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
  )
}

export default MyCoins