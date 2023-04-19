import React from 'react'
import Footer from '../components/Footer'
import migif from '../assets/sdk-gifs-86e75507b9f1aafe3eecefc5e55e5f6e.gif'
import Hero from '../components/Hero'

const HomePage = () => {
  return (
    <main>
      <h1>home</h1>
      <Hero />
      <img src={migif} alt={migif}/>
      <Footer />
    </main>
  )
}

export default HomePage