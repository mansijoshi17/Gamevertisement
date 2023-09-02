// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9; 

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract AdSpace is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private nftCounter;

    mapping(uint256 => uint256) private nftPrices;
    mapping(address => uint256[]) private userNFTs;

    constructor() ERC721("OpBnBAdSpace", "BAS") {
    }

    function mintNFT(
        uint256 price,
        string memory uri
    ) public returns (uint256) {
        nftCounter.increment();

        uint256 newTokenId = nftCounter.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, uri);
        nftPrices[newTokenId] = price;
        userNFTs[msg.sender].push(newTokenId);

        return newTokenId;
    }

    function purchaseToken(uint256 tokenId) public payable {
        require(_exists(tokenId), "token does not exist");
        require(
            msg.value == nftPrices[tokenId],
            "incorrect value"
        );

        address payable seller = payable(ownerOf(tokenId));
        _transfer(seller, msg.sender, tokenId);
        seller.transfer(msg.value);
    }

    function getAllTokens() public view returns (uint256[] memory) {
        uint256[] memory allTokens = new uint256[](nftCounter.current());
        for (uint256 i = 1; i <= nftCounter.current(); i++) {
            if (_exists(i)) {
                allTokens[i - 1] = i;
            }
        }
        return allTokens;
    }

    function getUserTokens(
        address user
    ) public view returns (uint256[] memory) {
        return userNFTs[user];
    }

    function getTotalSupply() public view returns (uint256) {
        return nftCounter.current();
    } 
}