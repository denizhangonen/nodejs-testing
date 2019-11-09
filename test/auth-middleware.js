// const expect = require("chai").expect;

// it("should add numbers correctly", () => {
//   const num1 = 3;
//   const num2 = 2;
//   expect(num1 + num2).to.equal(5);
// });
const expect = require("chai").expect;
const authMiddleware = require("../middleware/is-auth");

it("should throw an error if no header in req", () => {
  const req = {
    get: headerName => {
      return null;
    }
  };

  expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
    "Not authenticated!"
  );
});
