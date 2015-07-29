// Export modules to global scope as necessary (only for testing)
if (typeof process !== 'undefined' && ("" + process.title).search("node") !== -1) {
  // We are in node. Require modules.

  assert = require("assert");
  sinon = require("sinon");
  chai = require("chai");

  isBrowser = false;
} else {
  // We are in the browser. Set up variables like above using served js files.
   assert = require("assert");
   sinon = require("sinon");
   chai = require("chai");
  // num and sinon already exported globally in the browser.
  isBrowser = true;
}