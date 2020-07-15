import { _saveQuestionAnswer, _saveQuestion  } from '../utils/_DATA'
import { userAddQuestion } from '../actions/users'
import { hideLoading, showLoading } from 'react-redux-loading'
export const ADD_QUESTION = 'ADD_QUESTION'
export const SAVE_QUESTION = 'SAVE_QUESTION'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'


export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

export function saveQuestion({qid, authedUser, answer}) {
  return {
    type: SAVE_QUESTION,
    qid,
    authedUser,
    answer
  }
}

export function handleAddQuestion(question) {
  return (dispatch) => {
    dispatch(showLoading());
    _saveQuestion(question)
    .then((q) => {
      dispatch(addQuestion(q));
      dispatch(userAddQuestion(q))
      dispatch(hideLoading());
    })
    .catch((e) => {
      console.warn('Error in Add Question: ', e);
      alert('There was an error saving the question. Try again.');
    })
  }

}

export function handleSaveQuestion(info) {
  return (dispatch) => {
    dispatch(showLoading())
    _saveQuestionAnswer(info)
    .then(() => {
      dispatch(saveQuestion(info));
      dispatch(hideLoading());
      })
    .catch((e) => {
      console.warn('Error in Save Question: ', e);
      alert('There was an error saving the question. Try again.');
  });
};
}

