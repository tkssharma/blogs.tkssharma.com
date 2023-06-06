const transform = str => {
  const title = str.replace(/\s\s+/g, ' ');
  return title.split(' ').join('-');
}
const Publication = require('./publications');

const routes = Publication.YouTube.map(i => {
  const key = i.snippet.title && transform(i.snippet.title);
  return {
    name: key,
    isGlobal: false,
    data: key,
    link: `/publications/:${key}`,
  }
})
const config = {
  siteTitle: '@tkssharma | Tarun Sharma | My Profile',
  siteTitleShort: '@tkssharma | Tarun Sharma | @tkssharma',
  siteTitleAlt: 'Tarun Sharma | @tkssharma',
  siteLogo: '/logos/logo-1024.png',
  siteUrl: 'https://www.tkssharma.com',
  repo: 'https://github.com/tkssharma/tkssharma.com',
  pathPrefix: '',
  dateFromFormat: 'YYYY-MM-DD',
  dateFormat: 'MMMM Do, YYYY',
  siteDescription:
    'Hi, I’m Tarun.😎 I help people to make better world by good apps, I am Publisher, Trainer Developer, working on Enterprise and open source Technologies JavaScript frameworks (React Angular 2.x), I work with client side and server side javascript programming',
  siteRss: '/rss.xml',
  googleAnalyticsID: 'UA-26353225-1',
  postDefaultCategoryID: 'Tech',
  newsletter: '',
  newsletterEmbed: '',
  userName: 'Tarun',
  userEmail: 'tarun.softengg@gmail.com',
  userTwitter: 'tkssharma',
  menuLinks: [
    {
      name: 'About',
      isGlobal: true,
      data: 'About',
      link: '/me/',
    },
    {
      name: 'Articles',
      isGlobal: true,
      data: 'Articles',
      link: '/blog/',
    },
    {
      name: 'Tutorials',
      isGlobal: true,
      data: 'Tutorials',
      link: '/publications/',
    },
    {
      name: 'Contact',
      isGlobal: true,
      data: 'Contact',
      link: '/contact/',
    }, ...routes
  ],
  themeColor: '#3F80FF', // Used for setting manifest and progress theme colors.
  backgroundColor: '#ffffff',
}

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === '/') {
  config.pathPrefix = ''
} else {
  // Make sure pathPrefix only contains the first forward slash
  config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, '')}`
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === '/') config.siteUrl = config.siteUrl.slice(0, -1)

// Make sure siteRss has a starting forward slash
if (config.siteRss && config.siteRss[0] !== '/') config.siteRss = `/${config.siteRss}`

module.exports = config
