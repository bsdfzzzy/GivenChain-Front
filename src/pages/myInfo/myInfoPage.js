import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Card, CardText, CardHeader, CardActions} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField'
import PropTypes from 'prop-types'

export default class MyInfo extends React.Component {

  constructor(props, context) {
    super(props)

    this.contracts = context.drizzle.contracts

    this.handleAddress = this.handleAddress.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.review = this.review.bind(this)
    this.handleApprove = this.handleApprove.bind(this)
    this.handleReject = this.handleReject.bind(this)
    this.loadReviews = this.loadReviews.bind(this)

    this.state = {
      value: 'a',
      address: '',
      reviews: [{
        name: 'zzy',
        address: 'a2093ed'
      }, {
        name: 'zzy',
        address: 'a2093ed'
      }]
    };
  }

  handleChange(value) {
    this.setState({
      ...this.state,
      value: value,
    });
  }

  handleAddress(event, value) {
    this.setState({
      ...this.state,
      address: value
    })
  }

  card(data, i) {
    return (
      <div key={i}>
        <CardText expandable={true}>
          I need to do something blablablablablabla.
        </CardText>
        <Divider/>
      </div>
    )
  }

  handleApprove(review, event) {
    // this.contracts.Given
    // promise.then(result => {

    // }).catch(err => {
    //   console.log(err)
    // })
  }

  handleReject() {
    this.contracts.Given()
  }

  loadReviews() {
    const promise = this.contracts.GivenFactory.listContracts().call()
    promise.then(result => {
      console.log(result)
      const reviews = result.map((address, index) => {
        return {
          name: '',
          address
        }
      })
      this.setState({
        ...this.state,
        reviews
      })
    }).catch(err => {
      console.log(err)
    })

  }

  componentWillMount() {
    this.loadReviews()
  }

  review() {
    const reviews = this.state.reviews
    const that = this
    const renderReviews = reviews.map(function (review, i) {
      return (
        <div key={review.address}>
          <CardHeader
            title="Review"
            actAsExpander={false}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            受助人：{review.name}  合约地址：{review.address}
          </CardText>
          <CardActions>
            <TextField
              hintText="医院地址"
              style={{float: 'left', marginRight: '20px', marginLeft: '35px'}}
              underlineShow={false}
              onChange={that.handleAddress}
            /><br />
            <FlatButton label="Approve" style={{color: "green"}} onClick={that.handleApprove.bind(that, review)} />
            <FlatButton label="Reject" style={{color: "red"}} onClick={that.handleReject} />
          </CardActions>
          <Divider/>
        </div>
      )
    });

    return renderReviews
  }

  render() {
    const infos = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2];
    const renderInfos = infos.map((info, i) => {
      return this.card(info, i)
    });

    return (
      <div className="container">
        <h2>个人中心</h2>
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}
      >
        <Tab label="申请" value="a">
          <Card>
            {renderInfos}
          </Card>
        </Tab>
        <Tab label="捐助" value="b">
          <Card>
            {renderInfos}
          </Card>
        </Tab>
        <Tab label="审查" value="c">
          <Card>
            {this.review()}
          </Card>
        </Tab>
      </Tabs>
      </div>
    );
  }
}

MyInfo.contextTypes = {
  drizzle: PropTypes.object
}
