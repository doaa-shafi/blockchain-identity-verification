pragma solidity >=0.5.0 <=0.8.16;

contract IdentityVerification {


    mapping(string => address[]) facebookUserToAddresses;
    mapping(address => string) addressToFacebookUser; 
    mapping(address => uint16) numVerificationsLeftPlusOne;
    mapping(address => string[3]) userFiles;

    mapping(string => string[]) facebookUserVerifiers; 

    function register(
        string memory facebookId,
        string[3] memory fileHashes
    ) external {
        address userAddress = msg.sender;
        require(numVerificationsLeftPlusOne[userAddress] == 0); // make sure user is not already registerd
        
        string memory currentFacebookUser = addressToFacebookUser[msg.sender];
        require((keccak256(abi.encodePacked((currentFacebookUser))) == keccak256(abi.encodePacked((msg.sender)))));
        userFiles[userAddress] = fileHashes;
        numVerificationsLeftPlusOne[userAddress] = 3;
        facebookUserToAddresses[facebookId].push(userAddress);
        addressToFacebookUser[msg.sender] = facebookId;
    }

    function addWallet(string memory facebookId, address wallet) public {
        require((keccak256(abi.encodePacked((addressToFacebookUser[wallet]))) == keccak256(abi.encodePacked(("")))));
        addressToFacebookUser[wallet] = facebookId;
    }

    function verifyAnotherUser(
        string memory verifierFacebookId,
        string memory verifiedFacebookId
    ) public {
        require(!exists(verifierFacebookId,facebookUserVerifiers[verifiedFacebookId]));
        facebookUserVerifiers[verifiedFacebookId].push(verifierFacebookId);
    }

    function getVerificationsForUser(
        string memory facebookId
    ) public view returns(string[] memory) {
        return facebookUserVerifiers[facebookId];
    }

    function exists(string memory s, string[] memory array) public pure returns (bool) {
        for (uint i = 0; i < array.length; i++) {
            if ((keccak256(abi.encodePacked((array[i]))) == keccak256(abi.encodePacked((s))))) {
                return true;
            }
        }
        return false;
    }

}
