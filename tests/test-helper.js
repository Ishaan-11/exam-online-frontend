import Application from 'exam-online-frontend/app';
import config from 'exam-online-frontend/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

start();
