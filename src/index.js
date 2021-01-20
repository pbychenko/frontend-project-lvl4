// // @ts-check

import gon from 'gon';
import runApp from './init';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
console.log('fix');
runApp(gon);
