import React, { useMemo } from 'react'
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet'
const publications = require('../../data/publications');

import Layout from '../components/Layout'
import Guides from '../components/Guides'
import SEO from '../components/SEO'
import { getSimplifiedPosts, slugify } from '../utils/helpers'
import config from '../utils/config'
import Tutorials from "../components/Tutorials"
export default function GuidesIndex({ data }) {


  return (
    <Layout>
      <Helmet title={`Guides | ${config.siteTitle}`} />
      <SEO />
      <header>
        <div className="container">
          <h1>Guides.</h1>
          <p className="subtitle">
            The missing instruction manuals of the web. Long form articles,
            guides, tutorials, and references about programming and design.
          </p>
          <div className="categories">

          </div>
        </div>
      </header>
      <div className="container">
        <Tutorials  includeTime />
      </div>
    </Layout>
  )
}


