import React, { Component } from 'react'
import { connect } from 'react-redux';
import { handleSaveQuestion } from '../actions/questions';
import { Redirect } from 'react-router-dom'
import { updateUserAnswers } from '../actions/users';
import  Result  from './Result'

class Poll extends Component {

  state = {
    optionSelected: false,
    option: '',
    questionAnswered: false
  }

  handleChange = (e) => {
    const value = e.target.value
    this.setState(() => ({
      option: value,
      optionSelected: true
    }));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const qid = this.props.match.params.questionId;
    const {authedUser, dispatch} = this.props;
    const answer = this.state.option;
    dispatch(handleSaveQuestion({qid, authedUser, answer}))
    dispatch(updateUserAnswers({qid, authedUser, answer}))
  }

  render(){
    const questionId = this.props.match.params.questionId;
    const { questions, authedUser, users} = this.props;
    const question = questions[questionId];

    if (!authedUser) {
      return <Redirect to={`/signin`} />
    }

     if (!question) {
      return <Redirect to="/404" />
    }
    const userName = users[question.author].name;
    if (users[authedUser] && users[authedUser].answers[questionId]) {
      return <Result questionId={questionId}/>
    }

    return (
      <div className="center">
        <img height="100" width="100" src={users[questions[questionId].author].avatarURL} alt={userName} />
        <p>{question && users[question.author] && userName} asks,</p>
        <p>Would you rather </p>
        {question && (
          <form>
            <div>
            <input onChange={this.handleChange} type="radio" name="answer" id="optionOne" value="optionOne" checked={this.state.option === 'optionOne'}/>
            <label htmlFor="optionOne">{question.optionOne.text}</label>
            </div>
            <p>OR</p>
            <div>
            <input onChange={this.handleChange} type="radio" name="answer" id="optionTwo" value="optionTwo" checked={this.state.option === 'optionTwo'}/>
            <label htmlFor="optionTwo">{question.optionTwo.text}</label>
            </div>
            <button className="btn" disabled={!this.state.optionSelected} onClick={this.handleSubmit} type="submit">Submit</button>
          </form>
        )}
      </div>
    )
  }
}

function mapStateToProps({authedUser, questions, users}){
  return {
    authedUser,
    questions,
    users
  }
}


export default connect(mapStateToProps)(Poll)