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
      resolve: 'gatsby-plugin-guess-js',
      options: {
        // Find the view id in the GA admin in a section labeled "views"
        GAViewID: `229107995`,
        // Add a JWT to get data from GA
        jwt: {
          client_email: `blue-binder@blue-binder.iam.gserviceaccount.com`,
          private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || `none`
        },
        minimumThreshold: 0.03,
        // The "period" for fetching analytic data.
        period: {
          startDate: new Date('2018-1-1'),
          endDate: new Date()
        }
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID || 'none'
      }
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Roboto Slab:wght@700', 'Droid Serif', 'Noto Serif:ital,wght@1,700', 'Cormorant Garamond']
        }
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`
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
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-mdx`
  ]
}
