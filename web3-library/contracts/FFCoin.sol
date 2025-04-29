// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract FFCoin is ERC20, Ownable {
    uint private constant _DECIMALS = 18;
    uint public constant MAX_SUPPLY = 10000 * 10 ** _DECIMALS;

    string public _name = "FF Coin";
    string public _symbol = "FFC";

    constructor() ERC20(_name, _symbol) Ownable(msg.sender) {
        ERC20(_name, _symbol);
        // _mint(msg.sender, 10000 * 10 ** decimals());
    }

    // 给指定地址to铸造amount数量的代币
    // onlyOwner 修饰符限制只有合约的所有者才能调用该函数  
    function mint(address to, uint256 amount) public onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds max supply");
        _mint(to, amount);
    }

    function decimals() public pure override returns (uint8) {
        return _DECIMALS;
    }

    function burn(uint256 amount) public onlyOwner {
        _burn(msg.sender, amount);
    }
}
