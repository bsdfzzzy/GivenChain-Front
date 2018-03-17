import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'

// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {

  constructor(props) {
    super(props)

    this.routeToHome = this.routeToHome.bind(this)
    this.routeToAbout = this.routeToAbout.bind(this)
    this.routeToApply = this.routeToApply.bind(this)
    this.routeToMe = this.routeToMe.bind(this)
    this.routeToProjects = this.routeToProjects.bind(this)
  }

  routeToHome(event, route) {
    this.props.router.push('/')
  }

  routeToProjects(event, route) {
    this.props.router.push('/projects')
  }

  routeToApply(event, route) {
    this.props.router.push('/apply')
  }

  routeToAbout(event, route) {
    this.props.router.push('/review')
  }

  routeToMe(event, route) {
    this.props.router.push('/myInfo')
  }

  render() {
    return (
      <div className="App">
        <AppBar
          title="Given Chain"
          showMenuIconButton={false}
          iconElementRight={
            <div style={{lineHeight: '64px'}}>
              <FlatButton label="首页" style={{color: 'white'}} onClick={this.routeToHome}/>
              <FlatButton label="项目" style={{color: 'white'}} onClick={this.routeToProjects}/>
              <FlatButton label="申请" style={{color: 'white'}} onClick={this.routeToApply}/>
              <FlatButton label="关于" style={{color: 'white'}} onClick={this.routeToAbout}/>
              <FlatButton label="我的" style={{color: 'white'}} onClick={this.routeToMe}/>
              <FlatButton label=" "/>
            </div>
          }
        />
        {this.props.children}
      </div>
    );
  }
}

export default App
