pragma solidity ^0.8.0;

/**
 * @title PendingKnowledgeQueries
 * @dev A contract for managing knowledge queries with incentivized responses.
 * Users can submit queries with ETH deposits, and solvers can claim rewards
 * by providing validated solutions through the Polygon network.
 */
contract PendingKnowledgeQueries {
    struct QueryInfo {
        string content;      // The actual query content
        address locker;      // Address of who locked the query
        uint256 lockUntil;   // Timestamp until when the query is locked
        bool isLocked;       // Whether the query is currently locked
        bytes32 txHash;      // Solution transaction hash
        uint256 deposit;     // Amount of ETH deposited as reward
        address creator;     // Address of the person who created the query
    }

    // Mapping from UUID to its query information
    mapping(bytes32 => QueryInfo) public queryInfos;
    
    // Mapping from query string to UUID to prevent duplicates
    mapping(string => bytes32) private queryToUUID;
    
    // Events
    event QueryAdded(bytes32 indexed uuid, string content, address indexed submitter, uint256 deposit);
    event QueryLocked(bytes32 indexed uuid, address indexed locker, uint256 lockDuration);
    event LockExpired(bytes32 indexed uuid);
    event SolutionAdded(bytes32 indexed uuid, bytes32 indexed txHash, uint256 payout);
    event RewardIncreased(bytes32 indexed uuid, address indexed depositor, uint256 amount, uint256 newTotal);
    event RewardRefunded(bytes32 indexed uuid, address indexed creator, uint256 amount);

    // Helper function to generate UUID (using keccak256 for uniqueness)
    function generateUUID(string memory _query, address _sender) internal view returns (bytes32) {
        return keccak256(abi.encodePacked(_query, _sender, block.timestamp));
    }

    // Function to add a new query with a reward deposit
    function addQuery(string memory _query) public payable returns (bytes32) {
        require(queryToUUID[_query] == bytes32(0), "Query already exists");
        require(msg.value > 0, "Must deposit some ETH as reward");
        
        bytes32 uuid = generateUUID(_query, msg.sender);
        
        queryInfos[uuid] = QueryInfo({
            content: _query,
            locker: address(0),
            lockUntil: 0,
            isLocked: false,
            txHash: bytes32(0),
            deposit: msg.value,
            creator: msg.sender
        });
        
        queryToUUID[_query] = uuid;
        emit QueryAdded(uuid, _query, msg.sender, msg.value);
        return uuid;
    }
    
    // Function to lock a query for a specified duration
    function lockQuery(bytes32 _uuid, uint256 _duration) public {
        require(queryInfos[_uuid].lockUntil < block.timestamp, "Query is currently locked");
        require(_duration >= 1 minutes && _duration <= 30 days, 
                "Lock duration must be between 1 minute and 30 days");
        
        QueryInfo storage queryInfo = queryInfos[_uuid];
        require(bytes(queryInfo.content).length > 0, "UUID not found");
        
        // Set lock information
        queryInfo.locker = msg.sender;
        queryInfo.lockUntil = block.timestamp + _duration;
        queryInfo.isLocked = true;
        
        emit QueryLocked(_uuid, msg.sender, _duration);
    }

    // Function to submit a solution and claim the reward
    function submitSolution(
        bytes32 _uuid,
        bytes32 _polygonTxHash
    ) public {
        require(_polygonTxHash != bytes32(0), "Invalid transaction hash");
        
        QueryInfo storage queryInfo = queryInfos[_uuid];
        require(bytes(queryInfo.content).length > 0, "UUID not found");
        require(queryInfo.deposit > 0, "No reward available");
        
        // Store the reward amount before resetting it
        uint256 payoutAmount = queryInfo.deposit;
        
        // Update the transaction hash and reset deposit
        queryInfo.txHash = _polygonTxHash;
        queryInfo.deposit = 0;

        // TODO: Get isApproved from the Polygon transaction data
        // For now, we'll assume it's approved since we need to implement the chain data reading
        (bool sent, ) = payable(msg.sender).call{value: payoutAmount}("");
        require(sent, "Failed to send ETH to solver");
        emit SolutionAdded(_uuid, _polygonTxHash, payoutAmount);
    }
    
    // Function to check if a query is locked
    function isLocked(bytes32 _uuid) public view returns (bool) {
        QueryInfo storage queryInfo = queryInfos[_uuid];
        if (!queryInfo.isLocked) return false;
        if (block.timestamp > queryInfo.lockUntil) return false;
        return true;
    }
    
    // Function to get query information
    function getQueryInfo(bytes32 _uuid) public view returns (
        string memory content,
        address locker,
        uint256 lockUntil,
        bool currentlyLocked,
        bytes32 txHash,
        uint256 deposit,
        address creator
    ) {
        QueryInfo memory info = queryInfos[_uuid];
        require(bytes(info.content).length > 0, "UUID not found");
        
        return (
            info.content,
            info.locker,
            info.lockUntil,
            block.timestamp <= info.lockUntil && info.isLocked,
            info.txHash,
            info.deposit,
            info.creator
        );
    }

    // Function to increase the reward for an existing query
    function increaseReward(bytes32 _uuid) public payable {
        require(msg.value > 0, "Must deposit some ETH");
        
        QueryInfo storage queryInfo = queryInfos[_uuid];
        require(bytes(queryInfo.content).length > 0, "UUID not found");
        require(queryInfo.txHash == bytes32(0), "Query already has approved solution");
        
        // Add the new deposit to the existing reward
        uint256 newTotal = queryInfo.deposit + msg.value;
        queryInfo.deposit = newTotal;
        
        emit RewardIncreased(_uuid, msg.sender, msg.value, newTotal);
    }
} 