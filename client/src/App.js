import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import { BrowserRouter } from 'react-router-dom'
import Route from 'react-router-dom/Route'

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
      <Provider store={store}>
        <AppNavbar />
        <BrowserRouter>
          <Route exact path='/' component={Issues} />
          <Route path='/issue/:issueId' component={Comments} />
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
