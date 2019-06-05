import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { get } from 'http';

function* postEmailSaga(action) {
    try {
      const response= yield axios.get('/api/email/getemails')
      console.log('response from get saga for email', response.data[0].email);
        yield axios.post('/api/email/send', response.data[0].email)
        
    } catch (err) {
        console.log('error in post email saga',err);
    }

}

function* emailSaga() {
    yield takeLatest('SEND_EMAIL', postEmailSaga);
}

export default emailSaga;