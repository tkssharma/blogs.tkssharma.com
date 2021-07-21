import React from 'react'
import { Link } from 'gatsby'


export default function Footer() {
  return (
    <footer className="footer flex">
      <section className="container">
        <nav className="footer-links">
          <Link to="/blog">Blog</Link>
          <Link to="/guides">Guides</Link>
          <a
            href="https://tkssharma.substack.com/subscribe"
            target="_blank"
            rel="noopener noreferrer"
          >
            Newsletter
          </a>
          <Link to="/rss.xml">RSS</Link>
          <a
            href="https://ko-fi.com/tkssharma"
            target="_blank"
            rel="noopener noreferrer"
          >
            Donate
          </a>
          <a
            href="https://patreon.com/tkssharma"
            target="_blank"
            rel="noopener noreferrer"
          >
            Patreon
          </a>
        </nav>
        <nav className="flex justify-center">
        </nav>
      </section>
    </footer>
  )
}
