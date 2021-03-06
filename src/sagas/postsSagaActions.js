import {call, put} from "redux-saga/effects";
import {postsServices} from "../service/postsService";

export function* clearPostsSaga() {
    try {
        yield call(postsServices.clearPosts)
        yield put({type: 'clear_post_success'});
    } catch (error) {
        yield put({type: 'http_error', payload: error});
    }
}

export function* getPostsSaga() {
    try {
        let posts = yield call(postsServices.getPosts)
        yield put({type: 'get_post_success', payload: posts});
    } catch (error) {
        yield put({type: 'http_error', payload: error});
    }
}

export function* newPostSaga(action) {
    try {
        let output = yield call(postsServices.getPostLanguage, action.description);
        let {data: {language}} = output
        yield call(postsServices.newPost, action.description, language)
        yield put({type: 'new_post_success'});
        yield put({type: 'get_posts'});
    } catch (error) {
        yield put({type: 'http_error', payload: error.response.data});
    }
}