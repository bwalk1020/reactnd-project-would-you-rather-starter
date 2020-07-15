import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'

class SignIn extends Component {
  state = {
    user: '',
    toHome: false
  }
  handleChange = (e) => {
    const userId = e.target.value;
    this.setState( () => ({
      user: userId
    }));
  }

  handleSubmit = (e) => {
    const { dispatch } = this.props;
    e.preventDefault();
    dispatch(setAuthedUser(this.state.user))
    this.setState( () => ({
      toHome: true
    }));
  }
  render() {
    const { users } = this.props;
    const { user, toHome} = this.state;

    let userList = [];
    for (let key in users) {
      userList.push(users[key]);
    }

    if (toHome === true) {
      return <Redirect to={`/`} />
    }

    return(
      <div className="center">
        You must first Sign. Please Select a User.
        <form>
          <select onChange={this.handleChange}>
            <option key="default" value="default">Choose a User</option>
            {userList && userList.map((user) => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
          <button disabled={user === ''} type="submit" onClick={this.handleSubmit}>Sign In</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({users}){
  return {
    users,
  }
}

export default connect(mapStateToProps)(SignIn)