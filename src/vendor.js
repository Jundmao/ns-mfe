/**
 * production vendor示例
 * 由production页面负责控制这些版本的升级，不在本项目里配置
 */
import React from 'react'
import ReactDOM from 'react-dom'
import * as ReactRouterDOM from 'react-router-dom'
import * as MobX from 'mobx'
import * as MobXReact from 'mobx-react'
import * as antd from 'antd'
import G2 from '@antv/g2'
import DataSet from '@antv/data-set'
import axios from 'axios'

window.React = React
window.ReactDOM = ReactDOM
window.ReactRouterDOM = ReactRouterDOM
window.MobX = MobX
window.MobXReact = MobXReact
window.antd = antd
window.G2 = G2
window.DataSet = DataSet
window.axios = axios
