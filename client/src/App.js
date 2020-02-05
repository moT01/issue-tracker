import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Route from 'react-router-dom/Route'
import store from './redux/store'

import Issues from './components/Issues'
import Comments from './components/Comments'
import { loadUserAction } from './redux/actions/authActions'
import AppNavbar from './components/AppNavbar'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUserAction())
  }
  render() {
    return (
      <>
        <AppNavbar />
        <BrowserRouter>
          <Route exact path='/' component={Issues} />
          <Route path='/issue/:issueId' component={Comments} />
        </BrowserRouter>
      </>
    )
  }
}

export default App
