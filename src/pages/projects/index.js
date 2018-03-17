import ProjectsPage from './projectsPage'
import { drizzleConnect } from 'drizzle-react'

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    Given: state.contracts.Given,
    SimpleStorage: state.contracts.SimpleStorage,
    TutorialToken: state.contracts.TutorialToken,
    drizzleStatus: state.drizzleStatus
  }
}

const ProjectsContainer = drizzleConnect(ProjectsPage, mapStateToProps);

export default ProjectsContainer
