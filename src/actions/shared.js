import { _getUsers, _getQuestions } from '../utils/_DATA'
import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/questions'
import { showLoading, hideLoading } from 'react-redux-loading'

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading())
    return Promise.all([ _getQuestions(), _getUsers()])
      .then(([questions, users]) => {
        dispatch(receiveQuestions(questions));
        dispatch(receiveUsers(users));
        dispatch(hideLoading())
      })
  }
}