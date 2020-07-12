pragma solidity >=0.4.22 <0.7.0;

contract ProductManagement {
    
    struct Part {
        bytes32 typeOfParts; // type of parts
        bytes32 fac_name; //  factory name
        uint256 fac_id; // factory id 
        uint256 manufacture_date; // manufacture date of this part 
        uint256 serialNo; // serial number of this part
        address owner; // owner of this part 
    }
    
     struct Product {
        bytes32 typeOfParts; // type of parts
        bytes32 fac_name; //  factory name
        uint256 fac_id; // factory id 
        uint256 manufacture_date; // manufacture date of this part 
        uint256 serialNo; // serial number of this part
        uint256 wheels_serialNo; // serial number of wheels
        uint256 body_parts_serialNo; // serial number of body parts
        uint256 engines_serialNo; // serial number of engines
        uint256 transmissions_serialNo; // serial number of transmissions
        address owner; // owner of this part 
    }
    
    mapping(uint256 => Part) public parts;
    mapping(uint256 => Product) public products;
    
    uint256[] public partsAccts;
    uint256[] public productsAccts;
    
    function registerParts(bytes32 _typeOfParts, bytes32 _fac_name, uint256 _fac_id, uint256 _manufacture_date, uint256 _serialNo, address _owner) public {
    
            Part storage part = parts[_serialNo];
      
                part.typeOfParts = _typeOfParts;
                part.fac_name = _fac_name;
                part.fac_id =_fac_id;
                part.manufacture_date = _manufacture_date;
                part.serialNo = _serialNo;
                part.owner = _owner;
           
            partsAccts.push(_serialNo);
            // uint value = partsAccts.length - 1;
        
    }
    
    function registerProducts(bytes32 _typeOfParts, bytes32 _fac_name, uint256 _fac_id, uint256 _manufacture_date, uint256 _serialNo, uint256 _wheels_serialNo, uint256 _body_parts_serialNo, uint256 _engines_serialNo, uint256 _transmissions_serialNo, address _owner) public {
      
        require(parts[_wheels_serialNo].owner == msg.sender);  
        require(parts[_body_parts_serialNo].owner == msg.sender);
        require(parts[_engines_serialNo].owner == msg.sender);
        require(parts[_transmissions_serialNo].owner == msg.sender);
      
        Product storage product = products[_serialNo];
      
                product.typeOfParts = _typeOfParts;
                product.fac_name = _fac_name;
                product.fac_id =_fac_id;
                product.manufacture_date = _manufacture_date;
                product.serialNo = _serialNo;
                product.wheels_serialNo = _wheels_serialNo;
                product.body_parts_serialNo = _body_parts_serialNo;
                product.engines_serialNo = _engines_serialNo;
                product.transmissions_serialNo = _transmissions_serialNo;
                product.owner = _owner;
           
        productsAccts.push(_serialNo) ;
        // uint value = productsAccts.length - 1;
            
    }
    
    function getParts() view public returns(uint256[] memory) {
        return partsAccts;
    }
    
    function getPart(uint256 _serialNo) view public returns (bytes32 , bytes32 , uint256 , uint256 , uint256 , address) {
        return (parts[_serialNo].typeOfParts, parts[_serialNo].fac_name, parts[_serialNo].fac_id, parts[_serialNo].manufacture_date, parts[_serialNo].serialNo, parts[_serialNo].owner);
    }
    
    function countParts() view public returns (uint) {
        return partsAccts.length;
    }
    
      function getProducts() view public returns(uint256[] memory) {
        return productsAccts;
    }
    
    function getProduct(uint256 _serialNo) view public returns (bytes32 , bytes32 , uint256 , uint256 , uint256, uint256, uint256, uint256, uint256, address) {
        Product memory p = products[_serialNo];
        return (p.typeOfParts, p.fac_name, p.fac_id, p.manufacture_date, p.serialNo, p.wheels_serialNo, p.body_parts_serialNo, p.engines_serialNo, p.transmissions_serialNo, p.owner);
    }
    
    function countProducts() view public returns (uint) {
        return productsAccts.length;
    }
    
    function changeOwnershipParts(uint256 _serialNo, address _new_owner)  public{
        require(parts[_serialNo].owner == msg.sender);
        
        parts[_serialNo].owner = _new_owner;      
    }
    
    function changeOwnershipProducts(uint256 _serialNo, address _new_owner)  public{
        require(products[_serialNo].owner == msg.sender);
        
        products[_serialNo].owner = _new_owner;      
    }
   
    
}
