//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IERC721URIStorage is IERC721 {
    function tokenURI(uint256 tokenId) external view returns (string memory);
}