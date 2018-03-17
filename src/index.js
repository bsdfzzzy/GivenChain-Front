import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { DrizzleProvider } from 'drizzle-react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

// Layouts
import App from './App'
import HomeContainer from './layouts/home/HomeContainer'
import LoadingContainer from './layouts/loading/LoadingContainer'

// Pages
import ApplyContainer from './pages/apply'
import MyInfoContainer from './pages/myInfo'
import ProjectsContainer from './pages/projects'
import DetailContainer from './pages/detail'

// Contracts
import ComplexStorage from './../build/contracts/ComplexStorage.json'
import SimpleStorage from './../build/contracts/SimpleStorage.json'
import TutorialToken from './../build/contracts/TutorialToken.json'
import Given from './../build/contracts/Given.json'
import GivenFactory from './../build/contracts/GivenFactory.json'
import GivenToken from './../build/contracts/GivenToken.json'

// Redux Store
import store from './store'

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store)

// Set Drizzle options.
const options = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    }
  },
  contracts: [
    ComplexStorage,
    SimpleStorage,
    TutorialToken,
    Given,
    GivenFactory,
    GivenToken
  ],
  events: {
    SimpleStorage: ['StorageSet']
  }
}

const muiTheme = getMuiTheme({
  tabs: {
    backgroundColor: 'clear',
    textColor: 'black',
    selectedTextColor: 'gray'
  },
  inkBar: {
    backgroundColor: 'gray'
  }
})

ReactDOM.render((
      <DrizzleProvider options={options}>
        <MuiThemeProvider muiTheme={muiTheme}>
        <Provider store={store}>
          <LoadingContainer>
            <Router history={history}>
              <Route path="/" component={App}>
                <IndexRoute component={HomeContainer} />
                {/*<IndexRoute component={MyInfoContainer} />*/}
                <Route path="apply" component={ApplyContainer} />
                <Route path="myInfo" component={MyInfoContainer}/>
                <Route path="projects" component={ProjectsContainer} />
                <Route path="detail" component={DetailContainer} />
              </Route>
            </Router>
          </LoadingContainer>
        </Provider>
        </MuiThemeProvider>
      </DrizzleProvider>
  ),
  document.getElementById('root')
);
