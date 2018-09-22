import wrapPageElementWithTransition from './src/utils/wrapPageElement'

// Prevents animations running in the first 2 seconds of page load
// Previously the framerate was dropping a lot
export const onClientEntry = () => {
  setTimeout(() => {
    document
      .querySelectorAll('.preload')
      .forEach(n => n.classList.remove('preload'))
  }, 2000)
}

// Page Transitions
export const wrapPageElement = wrapPageElementWithTransition
