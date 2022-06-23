import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Account from "./pages/Account";
import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import CryptoPage from "./pages/CryptoPage";
import {AuthContextProvider} from "./context/AuthenticationContext";
import { Toaster } from 'react-hot-toast';

function App() {
  const [cryptoCoins, setCryptoCoins] = useState([]);

  const coinGeckoUrl =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true";

  useEffect(() => {
    const fetchCoins = async () => {
      try{
        axios.get(coinGeckoUrl).then((response) => {
          setCryptoCoins(response.data);
          console.log(response.data);
        })
      }catch(e){
        console.log(e.stack);
      }
    }
    setTimeout(() => {
      (async () => await fetchCoins()) ();
    },10)
  }, [coinGeckoUrl]);

  
  return (
    <ThemeProvider>
      <AuthContextProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home cryptoCoins={cryptoCoins} />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/account" element={<Account />} />
        <Route path="/coin/:coinId" element={<CryptoPage />}>
          <Route path=":coinId" />
        </Route>
      </Routes>
      <Footer />
      <Toaster />
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
