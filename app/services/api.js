import FetchService from 'ember-fetch-service/services/fetch';
import { inject as service } from '@ember/service';
import ENV from 'exam-online-frontend/config/environment';

export default class ApiService extends FetchService {
  @service session;

  get headers() {
    if (this.session.isAuthenticated) {
      const { jwt } = this.get('session.data.authenticated');
      return {
        'Content-Type': 'application/json',
        Authorization: `JWT ${jwt}`
      };
    }

    return {
      'Content-Type': 'application/json',
    };
  }

  request(url, opts, throwError = true) {
    return this
      .fetch(ENV.apiHost + '/api' + url, opts)
      .then(resp => {
        if (!resp.ok && throwError) {
          throw new Error(`Request failed with status code ${resp.status}`)
        }

        return resp;
      })
      .then(resp => resp.status === 204 ? resp : resp.json())
  }
}
