module.exports = {
  siteMetadata: {
    title: 'Blue Binder | 100 days of Gatsby challenge',
    description: 'A blog detailing my 100 days of learning Gatsby',
    keywords: 'gatsbyjs, gatsby, blog',
    siteUrl: 'https://gatsby-starter-typescript-plus.netlify.com',
    author: {
      name: 'Hassan Abudu',
      url: 'https://twitter.com/hassanabudu',
      email: 'meyian@gmail.com'
    }
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Noto Serif', 'Droid Serif', 'Noto Serif:ital,wght@1,700', 'Noto Serif Bold Italic']
        }
      }
    },
    /*

    'Noto Serif', 'Open Sans Condensed:300,700', 'Noto Serif Bold: 300, 700', 'Noto Serif italic: 700', 'Droid Serif'

    */
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content`
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1rem'
            }
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1140,
              quality: 90,
              linkImagesToOriginal: false
            }
          }
        ]
      }
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://gatsby-starter-typescript-plus.netlify.com'
      }
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet'
  ]
}
