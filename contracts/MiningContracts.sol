// SPDX-License-Identifier: GPL-v3.0
pragma solidity ^0.8.11;

import "@thirdweb-dev/contracts/drop/DropERC1155.sol";
import "@thirdweb-dev/contracts/token/TokenERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

contract MiningContracts is ReentrancyGuard, ERC1155Holder {
    DropERC1155 public immutable initialdNftCollection;
    TokenERC20 public immutable rewardsToken;

    constructor(DropERC1155 dropContractAddress, TokenERC20 tokenContractAddress) {
        initialdNftCollection = dropContractAddress;
        rewardsToken = tokenContractAddress;
    }

    struct MapValue {
        bool isData;
        uint256 value;
    }

    mapping (address => MapValue) public playerInitialD;

    mapping (address => MapValue) public playerLastUpdate;

    function stake(uint256 _tokenId) external nonReentrant {
        require(initialdNftCollection.balanceOf(msg.sender, _tokenId) >= 1, "Anda harus memiliki setidaknya 1 NFT untuk coba anda stake");

        if (playerInitialD[msg.sender].isData) {
            initialdNftCollection.safeTransferFrom(address(this), msg.sender, playerInitialD[msg.sender].value, 1, "Mengembalikan NFT lama kamu");
        }

        uint256 reward = calculateRewards(msg.sender);
        rewardsToken.transfer(msg.sender, reward);

        initialdNftCollection.safeTransferFrom(msg.sender, address(this), _tokenId, 1, "Staking NFT");

        playerInitialD[msg.sender].value = _tokenId;
        playerInitialD[msg.sender].isData = true;

        playerLastUpdate[msg.sender].isData = true;
        playerLastUpdate[msg.sender].value = block.timestamp;
    }


    function withdraw() external nonReentrant {
        require(playerInitialD[msg.sender].isData, "Kamu tidak memiliki NFT untuk di withdraw.");

        uint256 reward = calculateRewards(msg.sender);
        rewardsToken.transfer(msg.sender, reward);

        initialdNftCollection.safeTransferFrom(address(this), msg.sender, playerInitialD[msg.sender].value, 1, "Mengembalikan NFT lama kamu");

        playerInitialD[msg.sender].isData = false;
        playerLastUpdate[msg.sender].isData = true;
        playerLastUpdate[msg.sender].value = block.timestamp;
    }

    function claim() external nonReentrant {
        uint256 reward = calculateRewards(msg.sender);
        rewardsToken.transfer(msg.sender, reward);

        playerLastUpdate[msg.sender].isData = true;
        playerLastUpdate[msg.sender].value = block.timestamp;
    }        

    function calculateRewards(address _player)
        public
        view
        returns (uint256 _rewards)
    {
        if (!playerLastUpdate[_player].isData || !playerInitialD[_player].isData) {
            return 0;
        }

        uint256 timeDifference = block.timestamp - playerLastUpdate[_player].value;
        uint256 rewards = timeDifference * 10_000_000_000_000 * (playerInitialD[_player].value + 1);

        return rewards;
        
    }
}
