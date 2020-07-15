import React, { Component } from 'react'
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewPoll extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false
  }

  handleChange = (e) => {
    const option = e.target.placeholder.indexOf('One') >= 0 ? 'optionOneText' : 'optionTwoText';
    const value = e.target.value;
    this.setState(() => ({
      [option] :  value
    }));
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { optionOneText, optionTwoText } = this.state;
    const { dispatch, authedUser } = this.props;
    const author = authedUser;
    dispatch(handleAddQuestion({author, optionOneText, optionTwoText}));

    this.setState(()=>({
      optionOneText: '',
      optionTwoText: '',
      toHome: true
    }))


  } 

  render() {

    const { optionOneText, optionTwoText , toHome} = this.state;
    const { authedUser } = this.props;

    if (!authedUser) {
      return <Redirect to={`/signin`} />
    }

    if (toHome === true) {
      return <Redirect to="/" />
    }
    return (
      <div className="center">
        <h3 className="center">Create New Question</h3>
        <h4 className="center">Would you rather</h4>
        <form className="new-poll" onSubmit={this.handleSubmit}>
          <div>
            <textarea className="textarea" maxLength={280} onChange={this.handleChange} type="text" placeholder="Option One" value={this.state.optionOneText}/>
          </div>
          <h4 className="center">OR</h4>
          <div>
            <textarea className="textarea" maxLength={280} onChange={this.handleChange} type="text" placeholder="Option Two" value={this.state.optionTwoText}/>
          </div>
          <button className="btn" type="submit" disabled={optionOneText === '' || optionTwoText === ''}>Submit</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({authedUser}) {
  return {
    authedUser,
  }
}
  

export default connect(mapStateToProps)(NewPoll)