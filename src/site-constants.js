/**
 * Copyright (c) 2013-present, Facebook, Inc.
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
const version = '16.13.1';
>>>>>>> e548bd7e65086a8206fee46bd9e24b18b68bf045
const babelURL = 'https://unpkg.com/babel-standalone@6.26.0/babel.min.js';

export {babelURL, urlRoot, version};
