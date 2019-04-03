module.exports = {
  plugins: {
      
    'postcss-cssnext': process.env.NODE_ENV === 'production' ? {
      browsers: [
        'last 3 versions',
        'ie >= 10',
        'ff >= 30',
        'chrome >= 34',
        'safari >= 6',
        'opera >= 12.1',
      ],
    } : {
      browsers: [
        'last 2 versions',
      ]
    },
    'postcss-unrgba': process.env.NODE_ENV === 'production' ? {
      method: 'clone',
    } : false,
    'postcss-filter-gradient': process.env.NODE_ENV === 'production' ? {} : false,  
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*', '!border*']
    }
  },
};
