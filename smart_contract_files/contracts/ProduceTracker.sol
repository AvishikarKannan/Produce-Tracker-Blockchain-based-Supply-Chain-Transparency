// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ProduceTracker is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _produceIds;

    enum Status { Farm, Distributor, Retailer, Consumer }

    struct Update {
        Status status;         // Current stage
        string action;         // e.g., "Harvested", "Shipped", "Delivered"
        string location;       // "lat,long" or "City,Country"
        address actor;         // Who updated
        uint256 timestamp;     // When it was updated
    }

    struct Produce {
        uint256 id;
        string name;           // Product name (e.g., Mango)
        string origin;         // Origin farm/region
        uint256 price;         // Base price
        Status status;         // Current stage
        Update[] history;      // Journey history
    }

    mapping(uint256 => Produce) private produces;

    event ProduceAdded(uint256 indexed id, string name, string origin, uint256 price, address indexed farmer);
    event ProduceUpdated(uint256 indexed id, Status status, string action, string location, address indexed actor);

    // ---- FUNCTIONS ----

    // Farmer adds a new produce
    function addProduce(string memory name, string memory origin, uint256 price, string memory location) external {
        _produceIds.increment();
        uint256 newId = _produceIds.current();

        Update memory initUpdate = Update({
            status: Status.Farm,
            action: "Registered at Farm",
            location: location,
            actor: msg.sender,
            timestamp: block.timestamp
        });

        Produce storage p = produces[newId];
        p.id = newId;
        p.name = name;
        p.origin = origin;
        p.price = price;
        p.status = Status.Farm;
        p.history.push(initUpdate);

        emit ProduceAdded(newId, name, origin, price, msg.sender);
    }

    // Stakeholders add updates as produce moves
    function addUpdate(uint256 id, Status status, string memory action, string memory location) external {
        require(id > 0 && id <= _produceIds.current(), "Invalid ID");

        Produce storage p = produces[id];
        p.status = status;

        Update memory newUpdate = Update({
            status: status,
            action: action,
            location: location,
            actor: msg.sender,
            timestamp: block.timestamp
        });

        p.history.push(newUpdate);

        emit ProduceUpdated(id, status, action, location, msg.sender);
    }

    // Fetch a produce by ID
    function getProduce(uint256 id) external view returns (
        uint256, string memory, string memory, uint256, Status
    ) {
        require(id > 0 && id <= _produceIds.current(), "Invalid ID");
        Produce storage p = produces[id];
        return (p.id, p.name, p.origin, p.price, p.status);
    }

    // Fetch full journey history
    function getHistory(uint256 id) external view returns (Update[] memory) {
        require(id > 0 && id <= _produceIds.current(), "Invalid ID");
        return produces[id].history;
    }

    // Total number of produce batches
    function totalProduces() external view returns (uint256) {
        return _produceIds.current();
    }
}
