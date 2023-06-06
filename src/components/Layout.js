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
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4650067392768536"
          crossorigin="anonymous"></script>
      </Helmet>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  )
}
