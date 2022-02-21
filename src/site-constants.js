/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * @providesModule site-constants
 * @flow
 */

// NOTE: We can't just use `location.toString()` because when we are rendering
// the SSR part in node.js we won't have a proper location.
<<<<<<< HEAD
const urlRoot = 'https://hy.reactjs.org';
const version = '16.12.0';
=======
const urlRoot = 'https://reactjs.org';
const version = '17.0.2';
>>>>>>> 2310e15532aba273d713996a4c6ef04247dff764
const babelURL = 'https://unpkg.com/babel-standalone@6.26.0/babel.min.js';

export {babelURL, urlRoot, version};
