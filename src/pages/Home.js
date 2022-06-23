import React from 'react'
import Feed from '../components/Feed';
import Trending from '../components/Trending';

function Home({cryptoCoins}) {
  return (
    <div>
      <Feed cryptoCoins={cryptoCoins}/>
      <Trending />
    </div>
  )
}

export default Home