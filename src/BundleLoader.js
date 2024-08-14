import React from 'react'

/**
 * @class BundleLoader
 */
export default class BundleLoader extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      md: null
    }
  }

  componentDidMount() {
    this.init()
  }

  init() {
    const { bundle } = this.props

    if (bundle.prototype instanceof React.Component || typeof bundle !== 'function') {
      this.setState({
        md: bundle
      })
    } else {
      bundle(md => {
        this.setState({
          md: md.default || md
        })
      })
    }
  }

  render() {
    const Component = this.state.md
    const { match, location, history } = this.props

    if (!Component) {
      return null
    }

    return <Component match={match} location={location} history={history} />
  }
}
