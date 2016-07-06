var styles = require('./main.css')
module.exports = function(){
  var element = document.createElement('h1')
  element.innerHTML = 'Hello Webpack, Hello World!'
  element.className = styles.redBtn
  return element
}
