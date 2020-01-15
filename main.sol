pragma solidity ^0.5.1;

contract MyCont{
    
    uint256 public peopleCount = 0;
    mapping(uint => Person) public people;
    
    address owner;
    
    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }
    struct Person {
        uint _id;
        string _firstName;
        string _lastName;
        int _Age;
        
    }
    
    constructor() public{
        owner = msg.sender;
    }
    
    function addPerson(string memory _firstName, string memory _lastName, int _Age) public onlyOwner{
        peopleCount += 1;
        people[peopleCount] = Person(peopleCount, _firstName, _lastName, _Age);
    }
    
    function incCounrt() internal {
        peopleCount += 1;
    }
    
    
    
}
