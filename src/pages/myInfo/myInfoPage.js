import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Card, CardText, CardHeader, CardActions} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';

export default class MyInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
    };
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

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

  review() {
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