import React, { Component } from 'react'
import { connect } from 'react-redux'
import DashboardCard from './DashboardCard'
import { Redirect } from 'react-router-dom'

class Dashboard extends Component {
  state = {
    showAnswered: false
  }

  handleFilterChange = (e) => {
    e.preventDefault();
    this.setState( () => ({
      showAnswered: !this.state.showAnswered
    }));
  }

  render() {
    const { users, questionIds, authedUser } = this.props;
    let user;
    let answeredQuestions = [];
    let unansweredQuestions = [];

    if (!authedUser) {
      return <Redirect to={`/signin`} />
    }

    if(users[authedUser]) {
      user = users[authedUser];
      answeredQuestions = questionIds.filter( (id) => {
        return (user.answers[id])
      });

      unansweredQuestions = questionIds.filter( (id) => {
        return (!user.answers[id])
      });
    }
    

    return (
      <div>
        <h1 className="center">Polls</h1>
        {this.state.showAnswered && (
          <div className="center">
            <button  onClick={this.handleFilterChange} href="#">Show Unanswered Questions</button>
            <h3 className="center">Answered Questions</h3>
            <ul className="dashboard-list">
            {answeredQuestions.map( (q) => 
              <li key={q}>
                <DashboardCard questionId={q} userId={user.id} answered={true}/>
              </li>
            )}
            </ul>
          </div>
        )}

        {!this.state.showAnswered && (
          <div className="center">
            <button  onClick={this.handleFilterChange}>Show Answered Questions</button>
            <h3 className="center">Unanswered Questions</h3>
            <ul>
            {unansweredQuestions.map( (q) => 
              <li key={q}> 
                <DashboardCard questionId={q} userId={user.id} answered={false}/>
              </li>
            )}
            </ul>
        </div>
        )}    
      </div>
    )
  }
}

function mapStateToProps({authedUser, users, questions, loading}) {
  return {
    loading,
    authedUser,
    users,
    questions,
    questionIds: Object.keys(questions)
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
  }
}

export default connect(mapStateToProps)(Dashboard)