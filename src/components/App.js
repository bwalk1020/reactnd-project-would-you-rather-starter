import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import Nav from '../components/Nav'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import SignIn from './SignIn'
import Dashboard from './Dashboard'
import Poll from './Poll'
import NewPoll from './NewPoll'
import Leaderboard from './Leaderboard'
import NotFound from './NotFound'

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInitialData());  
  }
  render() {
    return (
      <Router>
        <Fragment>
          <div>
            <LoadingBar />
            <Nav authedUser={this.props.authedUser}/>
            {this.props.loading === true 
              ? null
              : 
              <div>
                <Route path="/signin" exact component={SignIn} />
                <Route path="/" exact component={Dashboard} />
                <Route path="/questions/:questionId" exact component={Poll} />
                <Route path="/404" exact component={NotFound} />
                <Route path="/add" exact component={NewPoll} />
                <Route path="/leaderboard" exact component={Leaderboard} />
              </div>
            }
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({authedUser, loading}){
  return {
    loading,
    authedUser
  }
}

export default connect(mapStateToProps)(App);
