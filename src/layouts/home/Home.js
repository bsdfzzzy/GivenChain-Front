import React, { Component } from 'react'
import { ContractData, ContractForm } from 'drizzle-react-components'
import logo from '../../logo.png'
import './home.css'

class Home extends Component {

  constructor(props, context) {
    super(props)
  }

  render() {
    return (
      <div className="floatContainer">
        <div className="left">
          <p>WHAT IS GIVENCHAIN?</p>
        </div>
        <div className="right">
          <p>GivenChain is </p>
        </div>
      </div>
    )
  }
}

export default Home
