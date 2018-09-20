// Prevents animations running in the first 2 seconds of page load
// Previously the framerate was dropping a lot
exports.onClientEntry = () => {
  console.log('client entry')
  setTimeout(() => {
    console.log('remove preload')
    document
      .querySelectorAll('.preload')
      .forEach(n => n.classList.remove('preload'))
  }, 2000)
}
