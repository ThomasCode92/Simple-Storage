// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract SimpleStorage {
    uint256 favoriteNumber;
    People[] public people;

    struct People {
        uint256 favoriteNumber;
        string name;
    }

    function store(uint256 _favoriteNumber) public {
        favoriteNumber = _favoriteNumber;
    }

    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }

    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        People memory newPerson = People({
            favoriteNumber: _favoriteNumber,
            name: _name
        });
        
        people.push(newPerson);
    }
}
