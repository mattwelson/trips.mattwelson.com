import wrapPageElementWithTransition from './src/utils/wrapPageElement'

// Adds a class to the body if the browser is IE
export const onClientEntry = () => {
  // Get IE or Edge browser version
  var version = detectIE()

  if (version === false) {
    document.body.classList.add('not-ie')
    return
  } else if (version >= 12) {
    document.body.classList.add('edge')
  } else {
    document.body.classList.add('ie')
  }

  function detectIE() {
    var ua = window.navigator.userAgent

    var msie = ua.indexOf('MSIE ')
    if (msie > 0) {
      // IE 10 or older => return version number
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10)
    }

    var trident = ua.indexOf('Trident/')
    if (trident > 0) {
      // IE 11 => return version number
      var rv = ua.indexOf('rv:')
      return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10)
    }

    var edge = ua.indexOf('Edge/')
    if (edge > 0) {
      // Edge (IE 12+) => return version number
      return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10)
    }

    // other browser
    return false
  }
}

// Page Transitions
export const wrapPageElement = wrapPageElementWithTransition
