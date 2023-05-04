const AuthKeeper = artifacts.require("AuthKeeper");

module.exports = function (deployer) {
    deployer.deploy(AuthKeeper);
};
