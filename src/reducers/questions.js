import { 
  ADD_QUESTION, 
  RECEIVE_QUESTIONS, 
  SAVE_QUESTION
} from '../actions/questions'

export function questions(state = {}, action) {
  switch(action.type) {
    case ADD_QUESTION :
      const { question } = action;
      return {
        ...state,
        [action.question.id]: question,
      }
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }
    case SAVE_QUESTION:
      const {qid,
        authedUser,
        answer} = action;
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat([authedUser])
           } 
        }
      }
    default:
      return state;
  }
}