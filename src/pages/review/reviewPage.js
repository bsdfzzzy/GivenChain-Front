
import React, { Component } from 'react'
import { ContractData, ContractForm } from 'drizzle-react-components'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';

class ReivewPage extends Component {

  render() {
    var reviews = [1, 2];
    var renderReviews = reviews.map(function (review, i) {
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
            <FlatButton label="Approve" />
            <FlatButton label="Reject" />
          </CardActions>
          <Divider/>
        </div>
      )
    });
    return (
      <div>
        <h3>请求审核</h3>
        <Card>
          {renderReviews}
        </Card>
      </div>
    )
  }
}

export default ReivewPage

