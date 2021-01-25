// // @ts-check
import { render } from 'react-dom';
import gon from 'gon';
import runApp from './init';

render(runApp(gon), document.getElementById('chat'));

export default runApp;
