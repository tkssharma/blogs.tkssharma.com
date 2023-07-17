import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'gatsby';
import Layout from '../components/Layout'
import config from '../../data/SiteConfig'
import { transform } from '../utils/global';
const publications = require('../../data/publications');


export default class PublicationsPage extends Component {
  render() {
    const pubs = Object.entries(publications);
    const link = 'http://s.ytimg.com/yts/img/no_thumbnail-vfl4t3-4R.jpg';
    return (
      <Layout>
        <Helmet title={`Published Articles – ${config.siteTitle}`} />
        <div className="" style={{ padding: '0 30px' }}>
          <header className="page-header">
            <h1>Publications</h1>
          </header>
          <div className="page">
            <p>I've written for.</p>
            {pubs.map((publication, i) => {
              const company = publication[0]
              const articles = publication[1]
              return (
                <article key={company}>
                  <h2 className="publication-company" id={company.replace(/\s/g, '')}>
                    {company}
                  </h2>
                  <ul key={i} style={{ display: 'flex', flexWrap: "wrap", justifyContent: 'space-between' }}>
                    {articles.map((article, f) => {
                      const key = article.snippet.title && transform(article.snippet.title);
                      return (article.snippet.thumbnails.medium.url !== link ? (
                        <li
                          style={{
                            display: 'flex'
                            , 'flexDirection': 'column'
                          }}
                          className="youtube"
                          key={f}
                        >
                          <div className="youtube__item">
                            <img href={`https://www.youtube.com/embed/videoseries?list=${article.id}`} className="youtube__img" src={article.snippet.thumbnails.medium.url} alt={article.snippet.title} />
                          </div>
                          <div className="youtube__content">
                            <Link to={`/course-on-${key}`} rel="noopener noreferrer">
                              <h5>{article.snippet.title}</h5>
                            </Link>
                          </div>
                        </li>
                      ) : ''
                      )
                    })}
                  </ul>
                </article>
              )
            })}
          </div>
        </div>
      </Layout>
    )
  }
}
