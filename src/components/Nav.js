import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser';

class Nav extends Component {
  handleLogout = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(setAuthedUser(null));
  }

  render() {
    const { authedUser, users } = this.props;
    return (
      <div>
        <nav className="nav">
        <ul>
          <li>
            <NavLink to="/" exact activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/add" activeClassName="active">
              New Poll
            </NavLink>
          </li>
          <li>
            <NavLink to="/leaderboard" activeClassName="active">
              Leaderboard
            </NavLink>
          </li>
          {this.props.authedUser && (
            <li>
              <NavLink to="/signin" onClick={this.handleLogout}>
                Logout
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
      <div className="center">
        {users[authedUser] && users[authedUser].name && (
          <div>
            <img height="50" width="50" src={users && users[authedUser].avatarURL} alt={users && users[authedUser].name}/>
            <p>Hello {users[authedUser].name}</p> 
            <hr/>
          </div>
          
        )
        }
        </div>
      </div>
    )
  }
}

function mapStateToProps({authedUser, users}) {
  return {
    authedUser,
    users
  }
}

export default connect(mapStateToProps)(Nav)
            