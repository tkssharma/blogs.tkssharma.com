import React from 'react'
import Helmet from 'react-helmet'

import Nav from './Nav'
import Footer from './Footer'

import '../style.css'
import '../new-moon.css'

export default function Layout({ children }) {
  return (
    <>
      <Helmet>
      </Helmet>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  )
}
