import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* postEmailSaga(action) {
    try {
    
        yield axios.post('/api/email/send')
        
    } catch (err) {
        console.log('error in post email saga',err);
    }

}

function* emailSaga() {
    yield takeLatest('SEND_EMAIL', postEmailSaga);
}

export default emailSaga;