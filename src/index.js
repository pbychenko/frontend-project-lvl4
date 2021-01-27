// // @ts-check
// import { render } from 'react-dom';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';
import gon from 'gon';
import runApp from './init';

// render(runApp(gon), document.getElementById('chat'));
runApp(gon);
