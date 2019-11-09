// const expect = require("chai").expect;

// it("should add numbers correctly", () => {
//   const num1 = 3;
//   const num2 = 2;
//   expect(num1 + num2).to.equal(5);
// });
const expect = require("chai").expect;
const authMiddleware = require("../middleware/is-auth");

describe("Auth Middleware", () => {
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

  it("should throw an error if authorization header contains only one string", () => {
    const req = {
      get: headerName => {
        return "ciciCat";
      }
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });
});
