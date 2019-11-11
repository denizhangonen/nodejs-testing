const expect = require("chai").expect;
const sinon = require("sinon");
const jwt = require("jsonwebtoken");

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

  it("should yield a userId property after decoding the token", () => {
    const req = {
      get: headerName => {
        return "Bearer ciciCat";
      }
    };
    sinon.stub(jwt, "verify");
    jwt.verify.returns({ userId: "ciciCat" });
    authMiddleware(req, {}, () => {});
    expect(req).to.have.property("userId");
    expect(req).to.have.property("userId", "ciciCat");
    expect(jwt.verify.called).to.be.true;
    jwt.verify.restore();
  });
});
