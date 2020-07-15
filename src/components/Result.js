import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Result extends Component {
  render() {

    const {authedUser, questions, users, questionId} = this.props;
    const user = users[authedUser];
    let answer;
    let question;
    let optionOneTally;
    let optionTwoTally;
    let optionOnePercentage;
    let optionTwoPercentage; 

    if(user && user.answers) {
      answer = user.answers[questionId];
      question = questions[questionId]
      
      optionOneTally = question.optionOne.votes.length;
      optionTwoTally = question.optionTwo.votes.length;
      optionOnePercentage = (optionOneTally === 0) ? 0 : (optionOneTally / (optionOneTally + optionTwoTally)) * 100;
      optionTwoPercentage = (optionTwoTally === 0) ? 0 : (optionTwoTally / (optionOneTally + optionTwoTally)) * 100;
      optionOnePercentage = Math.floor(optionOnePercentage);
      optionTwoPercentage = Math.floor(optionTwoPercentage);
    }

    if (!authedUser) {
      return <Redirect to={`/signin`} />
    }

    return (
      <div className="center">
        {this.props.loading
        ? null
        :
        <div>
          <h1>Asked by {question && users[question.author].name}</h1>
          <h2>Results</h2>
          <div>You answered: {question && question[answer].text}</div>
          <div>When it came to:</div>
          {question && (
            <div>
              <div>{question && question.optionOne.text}, which received {optionOneTally}/{optionOneTally + optionTwoTally} total votes, with a pick rate of {optionOnePercentage}%</div>
              <p>or</p>
              <div>{question && question.optionTwo.text}, which received {optionTwoTally}/{optionOneTally + optionTwoTally} total votes, with a pick rate of {optionTwoPercentage}%</div>
            </div>
          )}
        </div>
        }
      </div>
    )
  }
}

function mapStateToProps({authedUser, questions, users, loading}) {
  return {
    loading,
    authedUser,
    questions,
    users
  }
}

export default connect(mapStateToProps)(Result)