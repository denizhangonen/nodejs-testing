const expect = require("chai").expect;
const sinon = require("sinon");

const AuthController = require("../controllers/auth");
const User = require("../models/user");

describe("Auth Controller - Login", () => {
  it("should throw an error with code 500 if accessing database fails", done => {
    // stub User.findOne method
    sinon.stub(User, "findOne");
    User.findOne.throws();

    const req = {
      body: {
        email: "cicicat@cat.com",
        password: "tatliKedi"
      }
    };

    AuthController.login(req, {}, () => {}).then(result => {
      expect(result).to.be.an("error");
      expect(result).to.have.property("statusCode",500);
      done();
    });

    // restore stubbing
    User.findOne.restore();
  });
});
