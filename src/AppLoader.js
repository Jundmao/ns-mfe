import React from 'react'
import { Route } from 'react-router-dom'

import BundleLoader from './BundleLoader'
import { memoizePromise } from './utils'
import * as path from './utils/path'
import loadScript from './utils/loadScript'
import loadCss from './utils/loadCss'

const loadApp = memoizePromise(({ entry, name }) => {
  if (entry.css) {
    loadCss(entry.css, {
      name
    })
  }

  return loadScript(entry.script, {
    name,
    hour: true
  })
}, app => app.entry.script)

/**
 * @class AppLoader
 * 加载入口文件
 */
export default class AppLoader extends React.Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      routes: props.application.routes || []
    }
  }

  componentDidMount() {
    this.init()
  }

  init() {
    let { application } = this.props
    let { entry } = application

    if (!entry || !entry.script) {
      console.warn('application entry not found')
      return
    }

    // 加载入口JS，App路由注册逻辑在该JS里执行
    loadApp(application).then(() => {
      this.setState({
        routes: application.routes || []
      })
    })
  }

  render() {
    const { routes } = this.state
    const { match, application } = this.props

    if (!routes.length) {
      return null
    }

    return (
      // for css namespace
      <div className={`ns-mfe-app ns-mfe-app-${application.name}`}>
        {
          routes.map(item => {
            const p = path.join([match.path, item.path])

            return (
              <Route key={p} path={p} exact={!!item.exact} render={props => {
                return <BundleLoader {...props} bundle={item.component} />
              }} />
            )
          })
        }
      </div>
    )
  }
}
