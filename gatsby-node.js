const path = require('path')

const siteConfig = require('./data/SiteConfig');
const publicationsData = require('./data/publications');
const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPage = path.resolve('./src/templates/post.js')
  const pagePage = path.resolve('./src/templates/page.js')
  const tagPage = path.resolve('./src/templates/tag.js')
  const categoryPage = path.resolve('./src/templates/category.js')
  const publications = path.resolve('src/templates/youtube.js')
  const publicationVideo = path.resolve('src/templates/youtubeVideo.js')
  const YouTubeVideoData = require('./content/json/masterData.json');

  const postNodes = []
  const replaceAll = (searchString, replaceString, str) => {
    return str.split(searchString).join(replaceString);
  }

  const transform = str => {
    const title = str
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .toLowerCase().replace(/\s+/g, ' ')
      .trim()
    return title.split(' ').join('-');
  }

  function addSiblingNodes(createNodeField) {
    postNodes.sort(({ frontmatter: { date: date1 } }, { frontmatter: { date: date2 } }) => {
      const dateA = moment(date1, siteConfig.dateFromFormat)
      const dateB = moment(date2, siteConfig.dateFromFormat)

      if (dateA.isBefore(dateB)) return 1
      if (dateB.isBefore(dateA)) return -1

      return 0
    })

    for (let i = 0; i < postNodes.length; i += 1) {
      const nextID = i + 1 < postNodes.length ? i + 1 : 0
      const prevID = i - 1 >= 0 ? i - 1 : postNodes.length - 1
      const currNode = postNodes[i]
      const nextNode = postNodes[nextID]
      const prevNode = postNodes[prevID]

      createNodeField({
        node: currNode,
        name: 'nextTitle',
        value: nextNode.frontmatter.title,
      })

      createNodeField({
        node: currNode,
        name: 'nextSlug',
        value: nextNode.fields.slug,
      })

      createNodeField({
        node: currNode,
        name: 'prevTitle',
        value: prevNode.frontmatter.title,
      })

      createNodeField({
        node: currNode,
        name: 'prevSlug',
        value: prevNode.fields.slug,
      })
    }
  }

  exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions
    let slug

    if (node.internal.type === 'MarkdownRemark') {
      const fileNode = getNode(node.parent)
      const parsedFilePath = path.parse(fileNode.relativePath)

      if (
        Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
        Object.prototype.hasOwnProperty.call(node.frontmatter, 'title')
      ) {
        slug = `/${kebabCase(node.frontmatter.title)}/`
      } else if (parsedFilePath.name !== 'index' && parsedFilePath.dir !== '') {
        slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`
      } else if (parsedFilePath.dir === '') {
        slug = `/${parsedFilePath.name}/`
      } else {
        slug = `/${parsedFilePath.dir}/`
      }

      if (Object.prototype.hasOwnProperty.call(node, 'frontmatter')) {
        if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug'))
          slug = `/${node.frontmatter.slug}/`
        if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'date')) {
          const date = new Date(node.frontmatter.date)

          createNodeField({
            node,
            name: 'date',
            value: date.toISOString(),
          })
        }
      }
      createNodeField({ node, name: 'slug', value: slug })
      postNodes.push(node)
    }
  }

  exports.setFieldsOnGraphQLNodeType = ({ type, actions }) => {
    const { name } = type
    const { createNodeField } = actions
    if (name === 'MarkdownRemark') {
      addSiblingNodes(createNodeField)
    }
  }
  const result = await graphql(
    `
      {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
          edges {
            node {
              id
              frontmatter {
                title
                tags
                categories
                template
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const all = result.data.allMarkdownRemark.edges
  const posts = all.filter((post) => post.node.frontmatter.template === 'post')
  const pages = all.filter((post) => post.node.frontmatter.template === 'page')
  const tagSet = new Set()
  const categorySet = new Set()

  // =====================================================================================
  // Posts
  // =====================================================================================

  posts.forEach((post, i) => {
    const previous = i === posts.length - 1 ? null : posts[i + 1].node
    const next = i === 0 ? null : posts[i - 1].node

    if (post.node.frontmatter.tags) {
      post.node.frontmatter.tags.forEach((tag) => {
        tagSet.add(tag)
      })
    }

    if (post.node.frontmatter.categories) {
      post.node.frontmatter.categories.forEach((category) => {
        categorySet.add(category)
      })
    }

    createPage({
      path: post.node.fields.slug,
      component: blogPage,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })

  // =====================================================================================
  // Pages
  // =====================================================================================

  pages.forEach((page) => {
    createPage({
      path: page.node.fields.slug,
      component: pagePage,
      context: {
        slug: page.node.fields.slug,
      },
    })
  })

  // =====================================================================================
  // Tags
  // =====================================================================================

  const tagList = Array.from(tagSet)
  tagList.forEach((tag) => {
    createPage({
      path: `/tags/${slugify(tag)}/`,
      component: tagPage,
      context: {
        tag,
      },
    })
  })

  // =====================================================================================
  // Categories
  // =====================================================================================

  const categoryList = Array.from(categorySet)
  categoryList.forEach((category) => {
    createPage({
      path: `/categories/${slugify(category)}/`,
      component: categoryPage,
      context: {
        category,
      },
    })
  })
  publicationsData.YouTube.forEach((tag, index) => {
    const key = tag.snippet.title && transform(tag.snippet.title);
    const id = tag.id;
    createPage({
      path: `/course-on-${key}`,
      component: publications,
      context: {
        key,
        id
      },
    })
  })
  YouTubeVideoData.forEach((tag) => {
    const values = tag.value;
    values.forEach((page, index) => {
      if (page && page.snippet && page.snippet.title) {
        const key = page.snippet.title && transform(page.snippet.title);
        createPage({
          path: `/course-on-${key}`,
          component: publicationVideo,
          context: {
            key,
            data: page
          },
        })
      }
    })
  })
}

const createNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // =====================================================================================
  // Slugs
  // =====================================================================================

  let slug
  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)

    if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug')) {
      slug = `/${node.frontmatter.slug}/`
    } else {
      slug = `/${parsedFilePath.dir}/`
    }

    createNodeField({
      name: 'slug',
      node,
      value: slug,
    })
  }
}

exports.createPages = createPages
exports.onCreateNode = createNode

// Helpers
function slugify(str) {
  return (
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map((x) => x.toLowerCase())
      .join('-')
  )
}
