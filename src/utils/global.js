import urljoin from 'url-join'
import moment from 'moment'
import config from '../../data/SiteConfig'

const formatDate = date => moment.utc(date).format(config.dateFormat)

const editOnGithub = post => {
  const date = moment.utc(post.date).format(config.dateFromFormat)
  return urljoin(config.repo, '/blob/master/content/posts', `${date}-${post.slug}.md`)
}
const replaceAll = (searchString, replaceString, str) => {
  return str.split(searchString).join(replaceString);
}

const transform = str => {
  if (str) {
    const title = str
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .toLowerCase().replace(/\s+/g, ' ')
      .trim()
    return title.split(' ').join('-');
  }
  return null;
}
function appendComments(commentBox) {
  const commentScript = document.createElement('script')
  const theme = getTheme()

  commentScript.async = true
  commentScript.src = 'https://utteranc.es/client.js'
  commentScript.setAttribute('repo', 'tkssharma/comments')
  commentScript.setAttribute('issue-term', 'pathname')
  commentScript.setAttribute('id', 'utterances')
  commentScript.setAttribute('theme', theme)
  commentScript.setAttribute('crossorigin', 'anonymous')

  if (commentBox && commentBox.current) {
    commentBox.current.appendChild(commentScript)
  } else {
    console.log(`Error adding utterances comments on: ${commentBox}`)
  }
}
export function getTheme() {
  const theme = localStorage.getItem('theme')

  if (theme === 'dark') return 'dark-blue'
  if (theme === 'sepia') return 'gruvbox-dark'
  if (theme === 'light') return 'github-light'

  return 'github-dark'
}
export { formatDate, editOnGithub, transform, appendComments }
