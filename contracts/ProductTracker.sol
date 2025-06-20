// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ProductTracker {
    // Events
    event ProductAdded(uint256 indexed productId, string name, address indexed manufacturer);
    event ProductUpdated(uint256 indexed productId, string stage, address indexed updater);
    event CertificationAdded(uint256 indexed productId, string certification, address indexed certifier);
    event OwnershipTransferred(uint256 indexed productId, address indexed from, address indexed to);

    // Structs
    struct Product {
        uint256 id;
        string name;
        string description;
        address manufacturer;
        uint256 createdAt;
        bool exists;
        address currentOwner;
        string currentStage;
    }

    struct TraceabilityRecord {
        uint256 productId;
        string stage;
        string location;
        string description;
        uint256 timestamp;
        address updater;
    }

    struct Certification {
        string certType;
        string certifier;
        uint256 issuedAt;
        uint256 expiresAt;
        bool isValid;
    }

    // State variables
    mapping(uint256 => Product) public products;
    mapping(uint256 => TraceabilityRecord[]) public productHistory;
    mapping(uint256 => Certification[]) public productCertifications;
    mapping(address => bool) public authorizedManufacturers;
    mapping(address => bool) public authorizedCertifiers;
    
    uint256 private nextProductId;
    address public owner;

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can perform this action");
        _;
    }

    modifier onlyAuthorizedManufacturer() {
        require(authorizedManufacturers[msg.sender], "Only authorized manufacturers can perform this action");
        _;
    }

    modifier onlyAuthorizedCertifier() {
        require(authorizedCertifiers[msg.sender], "Only authorized certifiers can perform this action");
        _;
    }

    modifier productExists(uint256 _productId) {
        require(products[_productId].exists, "Product does not exist");
        _;
    }

    modifier onlyProductOwner(uint256 _productId) {
        require(products[_productId].currentOwner == msg.sender, "Only product owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
        nextProductId = 1;
        authorizedManufacturers[msg.sender] = true;
        authorizedCertifiers[msg.sender] = true;
    }

    // Authorization functions
    function addAuthorizedManufacturer(address _manufacturer) external onlyOwner {
        authorizedManufacturers[_manufacturer] = true;
    }

    function removeAuthorizedManufacturer(address _manufacturer) external onlyOwner {
        authorizedManufacturers[_manufacturer] = false;
    }

    function addAuthorizedCertifier(address _certifier) external onlyOwner {
        authorizedCertifiers[_certifier] = true;
    }

    function removeAuthorizedCertifier(address _certifier) external onlyOwner {
        authorizedCertifiers[_certifier] = false;
    }

    // Product management functions
    function addProduct(
        string memory _name,
        string memory _description,
        string memory _initialLocation
    ) external onlyAuthorizedManufacturer returns (uint256) {
        uint256 productId = nextProductId++;
        
        products[productId] = Product({
            id: productId,
            name: _name,
            description: _description,
            manufacturer: msg.sender,
            createdAt: block.timestamp,
            exists: true,
            currentOwner: msg.sender,
            currentStage: "Manufacturing"
        });

        // Add initial traceability record
        productHistory[productId].push(TraceabilityRecord({
            productId: productId,
            stage: "Manufacturing",
            location: _initialLocation,
            description: "Product created",
            timestamp: block.timestamp,
            updater: msg.sender
        }));

        emit ProductAdded(productId, _name, msg.sender);
        return productId;
    }

    function updateProductStage(
        uint256 _productId,
        string memory _newStage,
        string memory _location,
        string memory _description
    ) external productExists(_productId) {
        require(
            products[_productId].currentOwner == msg.sender || 
            authorizedManufacturers[msg.sender],
            "Unauthorized to update product"
        );

        products[_productId].currentStage = _newStage;

        productHistory[_productId].push(TraceabilityRecord({
            productId: _productId,
            stage: _newStage,
            location: _location,
            description: _description,
            timestamp: block.timestamp,
            updater: msg.sender
        }));

        emit ProductUpdated(_productId, _newStage, msg.sender);
    }

    function transferOwnership(uint256 _productId, address _newOwner) 
        external 
        productExists(_productId) 
        onlyProductOwner(_productId) 
    {
        address previousOwner = products[_productId].currentOwner;
        products[_productId].currentOwner = _newOwner;

        productHistory[_productId].push(TraceabilityRecord({
            productId: _productId,
            stage: "Ownership Transfer",
            location: "N/A",
            description: "Ownership transferred",
            timestamp: block.timestamp,
            updater: msg.sender
        }));

        emit OwnershipTransferred(_productId, previousOwner, _newOwner);
    }

    function addCertification(
        uint256 _productId,
        string memory _certType,
        string memory _certifier,
        uint256 _expiresAt
    ) external onlyAuthorizedCertifier productExists(_productId) {
        productCertifications[_productId].push(Certification({
            certType: _certType,
            certifier: _certifier,
            issuedAt: block.timestamp,
            expiresAt: _expiresAt,
            isValid: true
        }));

        emit CertificationAdded(_productId, _certType, msg.sender);
    }

    // View functions
    function getProduct(uint256 _productId) 
        external 
        view 
        productExists(_productId) 
        returns (Product memory) 
    {
        return products[_productId];
    }

    function getProductHistory(uint256 _productId) 
        external 
        view 
        productExists(_productId) 
        returns (TraceabilityRecord[] memory) 
    {
        return productHistory[_productId];
    }

    function getProductCertifications(uint256 _productId) 
        external 
        view 
        productExists(_productId) 
        returns (Certification[] memory) 
    {
        return productCertifications[_productId];
    }

    function getProductHistoryCount(uint256 _productId) 
        external 
        view 
        productExists(_productId) 
        returns (uint256) 
    {
        return productHistory[_productId].length;
    }

    function getProductCertificationCount(uint256 _productId) 
        external 
        view 
        productExists(_productId) 
        returns (uint256) 
    {
        return productCertifications[_productId].length;
    }

    function isProductValid(uint256 _productId) 
        external 
        view 
        productExists(_productId) 
        returns (bool) 
    {
        return products[_productId].exists;
    }

    function getTotalProducts() external view returns (uint256) {
        return nextProductId - 1;
    }
}