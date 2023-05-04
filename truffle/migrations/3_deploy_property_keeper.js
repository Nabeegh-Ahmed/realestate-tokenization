const PropertyKeeper = artifacts.require("PropertyKeeper");

module.exports = function (deployer) {
    deployer.deploy(PropertyKeeper);
};
