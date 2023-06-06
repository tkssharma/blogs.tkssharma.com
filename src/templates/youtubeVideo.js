import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Layout from '../components/Layout'
import config from '../../data/SiteConfig';
import SEO from '../components/YoutubeSeo';
import { GitComments } from '../components/GitComments';
import { formatDate, editOnGithub, appendComments } from '../utils/global'

export default class PublishedVideoTemplate extends Component {
  constructor(props) {
    super(props)
    this.commentBox = React.createRef()
  }
  componentDidMount() {
    appendComments(this.commentBox)
  }
  render() {
    const { key, data: videoDetails } = this.props.pageContext;

    const getStyle = (url) => {
      return {
        backgroundImage: `url(${url})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '300px',
        marginTop: '-40px',
      };
    };
    const desc = videoDetails?.snippet?.description?.replace(/\n/g, "<br />");
    return (
      <Layout>
        <Helmet>
          <title>{`${videoDetails.snippet.title}`}</title>
        </Helmet>
        <SEO postPath={key} key={key} postNode={videoDetails} postSEO />
        <div className="youtube-container">

          <section className="section container">
            <h3 className="text-center mt-20 mb-20">{`${videoDetails.snippet.title}`}</h3>
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
                        src={`https://www.youtube.com/embed/${videoDetails.snippet?.resourceId?.videoId}`}
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
