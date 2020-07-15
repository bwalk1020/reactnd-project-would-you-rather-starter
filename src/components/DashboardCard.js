import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class DashboardCard extends Component {

  state = {
    viewPoll: false,
    poll: '',
    viewResults: false
  }

  handleClick = (questionId) => {
    const {answered} = this.props;
    if (!answered) {
      this.setState( () => ({
        viewPoll: true,
        poll: questionId
      }));
    } else {
      this.setState( () => ({
        viewResults: true,
        poll: questionId
      }));
    }
    
  }

  render() {
    const { questions, users, questionId } = this.props;
    const userName = users[questions[questionId].author].name;

    if (this.state.viewPoll) {
      return <Redirect to={`/questions/${questionId}`} />
    } else if (this.state.viewResults) {
      return <Redirect to={`/questions/${questionId}`} />
    }

    return (
      <div>
        <img height="100" width="100" src={users[questions[questionId].author].avatarURL} alt={userName}/>
        <div className="dashboardcard-info">
        <span>{userName} asks, Would you rather </span>
        <div>{questions[questionId].optionOne.text}</div>
        <p>OR</p>
        <div>{questions[questionId].optionTwo.text}</div>
        <button className="btn" onClick={() => this.handleClick({questionId})}>Answer Poll</button>
        </div>
        
      </div>
    )
  }
}

function mapStateToProps({ users, questions}, userId, answered) {
  return {
    users,
    questions,
    userId
  }
}

export default connect(mapStateToProps)(DashboardCard)