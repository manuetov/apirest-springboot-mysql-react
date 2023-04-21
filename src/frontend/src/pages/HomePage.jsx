import React from 'react'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import { ContactForm, FormAdd } from '../components'

const HomePage = () => {
  return (
    <main>
      <Hero />
      {/* <ContactForm /> */}
      <FormAdd  />

      <Footer />
    </main>
  )
}

export default HomePage