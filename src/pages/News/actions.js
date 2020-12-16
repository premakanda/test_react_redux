// @flow

import { checkResponse } from '../../helpers/session'
import { httpGet } from '../../helpers/network'
import { defaultErrorMsg } from '../../constants/Defaults'

import * as t from './actionTypes'

export const newsRequest = () => ({
  type: t.NEWS_GET_REQUEST,
})

export const newsSuccess = (data: any) => ({
  type: t.NEWS_GET_SUCCESS,
  payload: data,
})

export const newsFailure = (errorMsg: string = defaultErrorMsg): any => ({
  type: t.NEWS_GET_FAILURE,
  payload: {
    errorMsg,
  },
  error: true,
})

export function getNews() {
  return (dispatch: any): any => {
    dispatch(newsRequest())

    return httpGet(`news`)
      .then(res => {
        if (checkResponse(res)) {
          dispatch(newsSuccess(res.data))
        } else {
          dispatch(newsFailure(res.message))
        }
      })
      .catch(error => {
        dispatch(newsFailure())
      })
  }
}
