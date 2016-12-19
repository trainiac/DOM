# DOM

A light DOM traversal library

# TODO

- Finish writing tests
- add webpack for AMD, UMD, CommonJS, import/export, and plain script builds
- Document API - try to do with documenting functions

- Add karma tests to get an idea for cross browser compatibility -- look into ci testling
- Add badges (e.g. current npm package, is up to date, code coverage)
- Only use lodash functional functions that are needed
- Look to optimize webpack build with UglifyJs, etc.
- Create utilities library that removes utils.js
- Release 1.0.0 update History.md

- Implement
  .next(selection) gets one node that matches the selection
  .nextAll(selection, scopeEl) gets all until el with option to filter
  .prev(selection) gets one node that matches the selection
  .prevAll(selection ,scopeEl) gets all until el with option to filter

- Allow selection to be an array, nodeList, ElementsStack instance, or function
