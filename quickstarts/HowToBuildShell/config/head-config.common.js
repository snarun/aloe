/**
 * Configuration for head elements added during the creation of index.html.
 *
 * All href attributes are added the publicPath (if exists) by default. You can
 * explicitly hint to prefix a publicPath by setting a boolean value to a key
 * that has the same name as the attribute you want to operate on, but prefix
 * with true / false.
 * 
 * @fileOverview Page Header configuration information
 * 
 *
 */
module.exports = {
  link: [
    /** <link> tags for favicons */
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/assets/favicon-32x32.png'
    }, {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/assets/favicon-16x16.png'
    }, {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/assets/favicon-96x96.png'
    },
    /** <link> tags for a Web App Manifest **/
    {
      rel: 'manifest',
      href: '/assets/manifest.json'
    }
  ],
  meta: [
    /**
     * Tile color
     */
    {
      name: 'msapplication-TileColor',
      content: '#D83434'
    },
    /**
     * Path to icon; 
     * For best results the icon should be transparent and sized
     * at 144x144 pixels
     */
    {
      name: 'msapplication-TileImage',
      content: '/assets/tileicon.png',
      '=content': true
    },
    /**
     * Theme color
     */
     {
      name: 'theme-color',
      content: '#00bcd4'
    }
  ]
};
