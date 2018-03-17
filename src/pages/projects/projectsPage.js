import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import AppBar from 'material-ui/AppBar'
import {GridList, GridTile} from 'material-ui/GridList'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar'
import LinearProgress from 'material-ui/LinearProgress'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentSend from 'material-ui/svg-icons/content/forward'

import './projects.css'

const styles = {
  gridList: {
    width: "100%",
    overflowY: 'auto',
  },
  projectsListItem: {
    height: '83%',
    width: '230px',
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
    boxSizing: 'content-box',
  },
  projectListHeaderAvatar: {
    float: 'left',
    marginRight: '10px'
  },
  projectsListContentButton: {
    position: 'absolute',
    right: '35px',
    bottom: '15px'
  }
}

const data = [{
  name: '欧阳乐乐',
  phone: '13800000000',
  avatar: '',
  progress: 30,
  reason: '感染初期，HIV大量复制，产生病毒血症，并可出现衣壳抗原p24的表达，临床表现为急性HIV感染症状。由于HIV的细胞内大量复制，导致CD4+淋巴细胞损伤、死亡，CD4+T细胞明显减少。然而在机体的免疫作用下，CD8+CTL活化，杀伤HIV感染细胞，同时产生抗HIV抗体，病毒血症很快被清除，CD4+淋巴细胞数量回升。'
}, {
  name: '小倩',
  phone: '13700000000',
  avatar: '',
  progress: 60,
  reason: 'HIV侵入CD4+淋巴细胞后，在病毒逆转录酶的作用下，合成DNA，并整合到宿主细胞的染色体，整合的病毒DNA即可在细胞内复制、形成完整的病毒体释放出细胞外，细胞死亡，感染新的细胞，也可呈潜伏感染状态，随细胞分裂而进入子代细胞。'
}, {
  name: '管管',
  phone: '13700000000',
  avatar: '',
  progress: 50,
  reason: 'HIV侵入CD4+淋巴细胞后，在病毒逆转录酶的作用下，合成DNA，并整合到宿主细胞的染色体，整合的病毒DNA即可在细胞内复制、形成完整的病毒体释放出细胞外，细胞死亡，感染新的细胞，也可呈潜伏感染状态，随细胞分裂而进入子代细胞。'
}, {
  name: '小倩',
  phone: '13700000000',
  avatar: '',
  progress: 90,
  reason: 'HIV侵入CD4+淋巴细胞后，在病毒逆转录酶的作用下，合成DNA，并整合到宿主细胞的染色体，整合的病毒DNA即可在细胞内复制、形成完整的病毒体释放出细胞外，细胞死亡，感染新的细胞，也可呈潜伏感染状态，随细胞分裂而进入子代细胞。'
}, {
  name: '小倩',
  phone: '13700000000',
  avatar: '',
  progress: 100,
  reason: 'HIV侵入CD4+淋巴细胞后，在病毒逆转录酶的作用下，合成DNA，并整合到宿主细胞的染色体，整合的病毒DNA即可在细胞内复制、形成完整的病毒体释放出细胞外，细胞死亡，感染新的细胞，也可呈潜伏感染状态，随细胞分裂而进入子代细胞。'
}]

class ProjectsPage extends Component {

  constructor(props, context) {
    super(props)

    this.contracts = context.drizzle.contracts

    this.state = {
      projects: data
    }
  }

  render() {
    return (
      <main className="projects-container">
        <h2>捐献项目</h2>
        <AppBar
          style={{"backgroundColor": "rgba(240,240,240,0.6)"}}
          showMenuIconButton={false}
        >
          <TextField
            className="projects-bar-search-content"
            hintText="查找救助人名字或者捐助项目的名称"
            fullWidth={true}
          />
        </AppBar>
        <GridList
          cellHeight={310}
          style={styles.gridList}
          cols={3}
        >
          {this.state.projects.map((person, index) => (
            <GridTile key={index}>
              <Paper style={styles.projectsListItem} zDepth={2}>
                <div className="projects-list-header">
                  <Avatar style={styles.projectListHeaderAvatar} />
                  <span className='projects-list-header-name'>{person.name}</span>
                  <span className='projects-list-header-phone'>{person.phone}</span>
                </div>
                <LinearProgress mode="determinate" value={person.progress} style={{width: '90%', margin: 'auto'}} />
                <p className='projects-list-item-content'>
                  {person.reason}
                </p>
                <FloatingActionButton mini={true} secondary={true} style={styles.projectsListContentButton}>
                  <ContentSend />
                </FloatingActionButton>
              </Paper>
            </GridTile>
          ))}
        </GridList>
      </main>
    )
  }
}

ProjectsPage.contextTypes = {
  drizzle: PropTypes.object
}

export default ProjectsPage
