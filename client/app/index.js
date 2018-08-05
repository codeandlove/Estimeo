import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import Root from './components/Root';

import './styles/styles.scss';

import store from './store';

render (<Root {...store} {...history} />, document.getElementById('app'));
