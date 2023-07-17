import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import { slugify } from '../utils/helpers'
const publications = require('../../data/publications');

import { transform } from '../utils/global';

export default function Guides({ data, frontPage, includeTime }) {
  const pubs = Object.entries(publications);
  const link = 'http://s.ytimg.com/yts/img/no_thumbnail-vfl4t3-4R.jpg';

  const articles = pubs[0][1]
  console.log(articles);

  return (
    <div className={frontPage ? 'guides front-page' : 'guides'}>
      {articles.map((guide) => {
        const key = guide.snippet.title && transform(guide.snippet.title);

        return (
          <div className="guide" key={guide.id}>
            <div className="guide-section">
              <Link to={`/course-on-${key}`} key={key}>
                <h2>{guide.snippet.title}</h2>
                {includeTime && <time>{guide.date}</time>}
                {guide.tags && (
                  <div className="tags" style={{ marginBottom: '1rem' }}>
                    {guide.tags.map((tag) => (
                      <Link
                        key={tag}
                        to={`/tags/${slugify(tag)}`}
                        className={`tag-${tag}`}
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                )}
              </Link>
              {guide.snippet.description && <p>{guide.snippet.description.substring(0, 200)}</p>}
            </div>
            <Link to={`/course-on-${key}`} key={key} className="image-section">
              {guide.snippet?.thumbnails?.high?.url ? (
                <img
                  src={guide.snippet?.thumbnails?.high?.url}
                  alt={guide.id}
                  height="200"
                  width="200"
                />
              ) : (
                <Img fixed={guide.thumbnail} />
              )}
            </Link>
          </div>
        )
      })
      }
    </div>
  )
}
