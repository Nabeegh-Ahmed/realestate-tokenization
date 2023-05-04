// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract AuthKeeper {
    struct UserData {
        string userHash;
        string email;
        string cnic;
        bool loggedIn;
    }

    mapping(address => UserData) public userDataMap;

    function addUser(
        string memory userHash,
        string memory email,
        string memory cnic
    ) public {
        UserData memory userData = UserData(userHash, email, cnic, true);
        userDataMap[msg.sender] = userData;
    }

    function checkUserExists() public view returns (bool) {
        if (bytes(userDataMap[msg.sender].email).length != 0) {
            return true;
        } else {
            return false;
        }
    }

    function login(string memory _userHash) public returns (bool) {
        if (
            keccak256(bytes(userDataMap[msg.sender].userHash)) ==
            keccak256(bytes(_userHash))
        ) {
            userDataMap[msg.sender].loggedIn = true;
            return true;
        }
        return false;
    }

    function logout() public {
        userDataMap[msg.sender].loggedIn = false;
    }

    function checkUserLoggedIn() public view returns (bool) {
        return userDataMap[msg.sender].loggedIn;
    }
}

contract PropertyKeeper {
    AuthKeeper authKeeper;
    struct PropertyData {
        string name;
        string area;
    }

    mapping(address => PropertyData[]) public userProperties;

    function addProperty(string memory name, string memory area) public {
        PropertyData memory userData = PropertyData(name, area);
        userProperties[msg.sender].push(userData);
    }

    function getPropertyCount() public view returns (uint256) {
        return userProperties[msg.sender].length;
    }

    function getProperty(
        uint256 index
    ) public view returns (string memory, string memory) {
        return (
            userProperties[msg.sender][index].name,
            userProperties[msg.sender][index].area
        );
    }

    function getAllProperties() public view returns (PropertyData[] memory) {
        return userProperties[msg.sender];
    }
}
