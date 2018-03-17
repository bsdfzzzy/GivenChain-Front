
import React, { Component } from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';

class ReivewPage extends Component {

  render() {
    const reviews = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2];
    const renderReviews = reviews.map(function (review, i) {
      return (
        <div key={i}>
        <CardHeader
          title="Review"
          actAsExpander={false}
          showExpandableButton={true}
        />
          <CardText expandable={true}>
            I need to do something blablablablablabla.
          </CardText>
          <CardActions>
            <FlatButton label="Approve" style={{color: "green"}}/>
            <FlatButton label="Reject" style={{color: "red"}}/>
          </CardActions>
          <Divider/>
        </div>
      )
    });
    return (
      <div className="container">
        <h2>请求审核</h2>
        <Card>
          {renderReviews}
        </Card>
      </div>
    )
  }
}

export default ReivewPage

