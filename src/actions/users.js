export const RECEIVE_USERS = 'RECEIVE_USERS'
export const UPDATE_USER_ANSWERS = 'UDPATE_USER_ANSWERS'
export const USER_ADD_QUESTION = 'USER_ADD_QUESTION'

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  }
}

export function updateUserAnswers({qid, authedUser, answer}) {
  return {
    type: UPDATE_USER_ANSWERS,
    qid, 
    authedUser, 
    answer
  }
}

export function userAddQuestion({id, author}) {
  return {
    type: USER_ADD_QUESTION,
    qid: id,
    authedUser: author
  }
}