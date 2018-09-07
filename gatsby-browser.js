// Prevents animations running in the first 2 seconds of page load
// Previously the framerate was dropping a lot
exports.onInitialClientRender = () => {
  console.log('render')
  setTimeout(
    () => {
      console.log('remove preload')
      document
        .querySelectorAll('.preload')
        .forEach(n => n.classList.remove('preload'))
    },
    2000
  )
}
