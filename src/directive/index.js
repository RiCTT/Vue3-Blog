
// Todo：工程化自动导入
import Loading from './loading'
export default {
  install: function(app) {
    app.directive('loading', Loading)
  }
}