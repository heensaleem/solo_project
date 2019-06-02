import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchRecipeSaga() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.get('api/recipe', config);

        yield put({ type: 'SET_RECIPES', payload: response.data });
    } catch (error) {
        console.log('user items get recipe request failed', error);
    }
}

function* postRecipeSaga(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        yield axios.post('/api/recipe', action.payload, config)
        yield put({ type: 'FETCH_RECIPES' })
    } catch (err) {
        console.log('error in post recipe',err);
    }
}

function* postfavrecipeSaga(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        yield axios.post('/api/favourite', action.payload, config)
        yield put({ type: 'GET_FAV_RECIPES'})
    } catch (err) {
        console.log('error in post fav recipe',err);
    }
}

function* fetchFavRecipesaga() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.get('api/favourite', config);

        yield put({ type: 'SET_FAV_RECIPES', payload: response.data });
    } catch (error) {
        console.log('user items get recipe request failed', error);
    }
}

function* removeFavRecipeSaga(action) {
    try { 
        console.log('delete from sagas',action.payload)
        yield axios.delete(`/api/favourite/${action.payload.recipe_id}`)
        yield put({type: 'GET_FAV_RECIPES'})
    }
    catch(error) {
    console.log(error)
  }
}

function* recipeSaga() {
    yield takeLatest('FETCH_RECIPES', fetchRecipeSaga);
    yield takeLatest('ADD_RECIPES', postRecipeSaga);
    yield takeLatest('POST_FAV_RECIPE', postfavrecipeSaga);
    yield takeLatest('GET_FAV_RECIPES', fetchFavRecipesaga);
    yield takeLatest('REMOVE_FAV_RECIPE', removeFavRecipeSaga);
}


export default recipeSaga;