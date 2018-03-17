import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import LinearProgress from 'material-ui/LinearProgress'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

import './detail.css'

class DetailPage extends Component {

  constructor(props, context) {
    super(props)

    this.contracts = context.drizzle.contracts

    this.state = {}
  }

  render() {
    return (
      <main>
        <div className="detail-head-container">
          <div className="detail-head-info">
            <div className="detail-head-info-title">捐助名称</div>
            <div className="detail-head-info-content">
            </div>
          </div>
          <div className="detail-head-donate">
            <div className="detail-head-donate-container">
              <LinearProgress mode="determinate" value={20} />
              <div className="detail-head-donate-content">
                <span className="detail-head-donate-content-need">还需募集 {30} 万元</span>
                <span className="detail-head-donate-content-desc">总共需要 {50} 万元</span>
                <span className="detail-head-donate-content-name">{100} 人</span>
                <span className="detail-head-donate-content-desc">参与人数</span>
                <span className="detail-head-donate-content-name">{30} 天</span>
                <span className="detail-head-donate-content-desc">剩余时间</span>
              </div>
            </div>
            <div>
              <TextField hintText="金额（元）" style={{float: 'left', marginTop: '20px'}}/><br />
              <RaisedButton label="捐助" secondary={true} style={{float: 'left', marginLeft: '20px'}} />
            </div>
          </div>
        </div>
        <div className="detail-content-title">使用历史</div>
        <div className="detail-content-container">
          <div className="detail-content-content">
            <Card>
              <CardHeader
                style={{paddingLeft: '35px'}}
                title="Without Avatar"
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardActions>
                <FlatButton label="Yes" />
                <FlatButton label="No" />
              </CardActions>
              <CardText expandable={true}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
              </CardText>
            </Card>
            <Card>
              <CardHeader
                style={{paddingLeft: '35px'}}
                title="Without Avatar"
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
              </CardText>
            </Card>
          </div>
        </div>
      </main>
    )
  }
}

DetailPage.contextTypes = {
  drizzle: PropTypes.object
}

export default DetailPage
