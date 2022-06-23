import React from "react";
import "../index.css";
import ToggleTheme from "./ToggleTheme";

const Footer = () => {
  const todayDate = new Date();
  return (
    <div className="rounded-div mt-8 pt-8">
      <div className="grid md:grid-cols-2">
        <div className="flex justify-evenly w-full md:max-w-[300px] uppercase">
          <div>
            <h2 className="font-bold">Support</h2>
            <ul>
            <li className="text-sm py-2"><a href="https://www.coingecko.com/en/about" target="_blank"
                rel="noreferrer">About Us</a></li>
              <li className="text-sm py-2"><a href="https://www.coingecko.com/en/faq" target="_blank"
                rel="noreferrer">FAQ</a></li>
              <li className="text-sm py-2"><a href="https://store.coingecko.com/pages/contact-us" target="_blank"
                rel="noreferrer">Contact Us</a></li>
              <li className="text-sm py-2">API Status</li>
              <li className="text-sm py-2"><a href="https://www.coingecko.com/en/api/documentation" target="_blank"
                rel="noreferrer">Documentation</a></li>
            </ul>
          </div>
        </div>
        <div className="text-right">
          <div className="w-full flex justify-end">
            <div className="w-full md:w-[300px] py-4 relative">
              <div className="flex justify-center md:justify-end py-4 md:py-0 md:pb-4 mt-[-1rem]">
                <ToggleTheme />
              </div>
              <p className="font-bold">Click Below For Crypto News</p>
              <a
                href="https://cryptodaily.co.uk/"
                target="_blank"
                rel="noreferrer"
              >
                Crypto Daily
              </a>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center py-4">
        Powered by: Coin Gecko: &nbsp; Developed by: &nbsp;
        <a
          id="link"
          href="https://www.linkedin.com/in/emmanuel-kaome-0247b7224/"
          target="_blank"
          rel="noreferrer"
        >
          Emmanuel Kaome &nbsp;
        </a>
      </p>
      <p className="font-bold text-center py-4">
        Copyright &copy; {todayDate.getFullYear()}
      </p>
    </div>
  );
};

export default Footer;
