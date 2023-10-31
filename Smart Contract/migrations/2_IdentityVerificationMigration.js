var IdentityVerification = artifacts.require("./IdentityVerification.sol");

module.exports = function(deployer) {
  deployer.deploy(IdentityVerification);
};