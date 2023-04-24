import React from 'react'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import { FormAdd } from '../components'

const HomePage = () => {
  return (
    <main>
      <Hero />
      <FormAdd  novermiga={true}/>
      <Footer />
    </main>
  )
}

export default HomePage