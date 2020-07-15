import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Leaderboard extends Component {
  render() {
    const { users, userIds, authedUser } = this.props;
    let userList = [];
    for (let id in userIds) {
      userList.push( users[userIds[id]]);
    }

    if(!authedUser) {
      return <Redirect to="/signin" />
    }

    return (
      <div className="center">
        <h1>Leaderboard</h1>
        {userList && (
          <ul>
            {userList.map((user) => (
              <li key={user.id}>
                <img height="100" width="100" alt={user.name} src={user.avatarURL} />
                <div>{user.name}</div>
                <div>questions: {user.questions.length}</div>
                <div>answered: {Object.keys(user.answers).length}</div>
                <div>score: {user.questions.length + Object.keys(user.answers).length}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

function mapStateToProps({users, questions, authedUser}) {
  return {
    users,
    questions,
    authedUser,
    userIds: Object.keys(users)
      .sort((a, b) => (users[b].questions.length + Object.keys(users[b].answers).length) - (users[a].questions.length + Object.keys(users[a].answers).length))
  }
}

export default connect(mapStateToProps)(Leaderboard)