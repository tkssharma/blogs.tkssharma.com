import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Layout from '../components/Layout'
import config from '../../data/SiteConfig';
import SEO from '../components/YoutubeSeo';
const Data = require('../../data/publications');
const masterData = require('../../content/json/masterData');
const { transform } = require('../utils/global');
import { formatDate, editOnGithub, appendComments } from '../utils/global'
import { GitComments } from '../components/GitComments';


const fetchData = (id) => {
  return masterData.filter((i) => {
    return i.key === id;
  })[0];
};
export default class PublishedVideoTemplate extends Component {
  constructor(props) {
    super(props)
    this.commentBox = React.createRef()
  }
  componentDidMount() {
    appendComments(this.commentBox)
  }
  render() {
    let titleData = {};
    const { key, id } = this.props.pageContext;
    const result = Data.YouTube.filter((i) => {
      return i.id === id;
    })[0];
    const masterList = fetchData(result.id);
    const playlistItems = masterList?.value;

    const getStyle = (url) => {
      return {
        backgroundImage: `url(${url})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '300px',
        marginTop: '-40px',
      };
    };
    if (!playlistItems) {
      return <span>error</span>
    }
    const desc = playlistItems[0]?.snippet?.description?.replace(/\n/g, "<br />");
    return (
      <Layout>
        <Helmet>
          <title>{`${result.snippet.title}`}</title>
        </Helmet>
        <SEO postPath={key} key={key} postNode={result} postSEO />
        <div className="youtube-container">

          <section className="section container mt-20">
            <h3 className="mt-20 mb-20 text-center">{`${result.snippet.title}`}</h3>
            <div className="lesson-without-playlist-holder">
              <div className="lessons-frame-holder">
                <div className="lessons-frame ">
                  <section className="section text-center">
                    <div className="video-container">
                      <iframe
                        frameBorder="0"
                        width="100%"
                        height="500"
                        allow='autoplay'
                        allowFullScreen=""
                        allowFullScreen=""
                        src={`https://www.youtube.com/embed/videoseries?list=${result.id}`}
                      />
                    </div>
                  </section>
                  <p className="mt-40 p-20" dangerouslySetInnerHTML={{ __html: desc }}></p>

                </div>
              </div>
            </div>
          </section>
        </div>
        <section id="comments" className="comments container mt-40">
          <h3>Comments</h3>
          <GitComments commentBox={this.commentBox} />
        </section>
      </Layout>
    );
  }
}
