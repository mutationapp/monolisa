module.exports = {
  fonts: {
    uberMove: {
      media: {
        1600: 70,
        1200: 65,
        900: 56,
        600: 40,
        0: 70,
      },
      headerTypography: [
        // [4.8, 3.6, 2.2, 1.8, 1.8, 1.4],
        // [9.6, 4.8, 3.7, 2.4, 2.4, 1.6],
        // [12.8, 6.4, 4, 3.2, 2.4, 1.8],
        // [14.4, 7.2, 4.5, 3.6, 2.4, 1.8],
        [18, 9, 5.6, 4.5, 3, 2.2],
      ],
      baseFontSize: '10px',
      fontFamily: {
        text: {
          regular: {
            name: 'Uber Move Text Regular',
            src: '/static/fonts/move/uberMoveText.regular.woff',
          },
          medium: {
            name: 'Uber Move Text Medium',
            src: '/static/fonts/move/uberMoveText.medium.woff',
          },
        },
        header: {
          regular: {
            name: 'Uber Move Regular',
            src: '/static/fonts/move/uberMove.regular.woff',
          },
          medium: {
            name: 'Uber Move Medium',
            src: '/static/fonts/move/uberMove.medium.woff',
          },
        },
      },
    },
  },
}
