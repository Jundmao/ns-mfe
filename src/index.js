import React from 'react'
import { Route } from 'react-router-dom'

import AppLoader from './AppLoader'
import { getPublicPath } from './utils'

/**
 * @class NsMfe
 */
class NsMfe {
  constructor() {
    // 根据application注册的顺序来决定route匹配的顺序
    this.applications = []
    this.applicationMap = {}
    this.modules = {}
    this.utils = {
      getPublicPath
    }
  }

  /**
   *
   * @param {string}  name
   * @param {object}  application
   * @param {string}  application.path
   * @param {bool}    application.exact
   * @param {string}  application.entry
   * @param {array}   application.routes
   */
  registerApplication(name, application={}, appConfig={}) {
    if (this.applicationMap[name]) {
      console.warn(`application ${name} has been registered`)
      return
    }

    application.name = name
    application._config = appConfig

    // entry为string时是script
    if (typeof application.entry === 'string') {
      application.entry = {
        script: application.entry
      }
    }

    this.applicationMap[name] = application
    this.applications.push(application)
  }

  getApplication(name) {
    return this.applicationMap[name]
  }

  getApplicationConfig(name) {
    const app = this.getApplication(name)
    if (app) {
      return app._config
    }

    return null
  }

  /**
   * @param {string}    name
   * @param {array}     routes
   * @param {string}    route.path
   * @param {bool}      route.exact
   * @param {component} route.component
   * @memberof NsMfe
   */
  registerRoutes(name, routes) {
    const application = this.getApplication(name)

    if (!application) {
      console.warn(`application ${name} not found`)
      return
    }

    application.routes = routes
  }

  define(name, module) {
    if (this.modules[name]) {
      console.warn(`module ${name} has been defined`)
      return
    }

    this.modules[name] = module
  }

  require(name) {
    return this.modules[name]
  }

  routes() {
    const routes = this.applications.map(application => {
      return (
        <Route
          key={application.name}
          path={application.path}
          exact={!!application.exact}
          render={props => {
            return <AppLoader {...props} application={application} />
          }}
        />
      )
    })

    return routes
  }
}

export default new NsMfe()
