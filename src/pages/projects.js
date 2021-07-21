import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import config from '../utils/config'

export default function ProjectsIndex() {
  return (
    <Layout>
      <Helmet title={`Projects | ${config.siteTitle}`} />
      <SEO />
      <div className="page">
        <header>
          <div className="container">
            <h1>Projects.</h1>
            <p className="subtitle">
              A few highlights of my open-source projects. View them all{' '}
              <a href="https://github.com/tkssharma">on GitHub</a>.
            </p>
          </div>
        </header>

        <div className="container">
         </div>
      </div>
    </Layout>
  )
}
