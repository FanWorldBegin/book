


exports.onCreatePage = ({ page, actions }) => {

  const { createPage } = actions
  // Make the front page match everything client side.
  // Normally your paths should be a bit more judicious.
  console.log(page.path)
  if (page.path === `/novelPage/*`) {
    page.matchPath = `/novelPage`
    createPage(page)
  }
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  console.log('loader')
  console.log(loaders)
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /uke-request/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}