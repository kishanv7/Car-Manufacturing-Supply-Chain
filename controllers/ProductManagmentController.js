var { AppController } = require('./appController');
var Web3 = require('web3');
var PMAbi = require('./PMabi.json');
var gasPriceGwei = 41;
//var gasLimit = 63123  184000;
var gasLimit = 2816636;
var web3 = null;
var Tx = require('ethereumjs-tx');

const OPTIONS = {
    defaultBlock: "latest",
    transactionConfirmationBlocks: 1,
    transactionBlockTimeout: 5
  };

class PMContract extends AppController {

    constructor() {
        super();

        web3 = new Web3(new Web3.providers.HttpProvider(process.env.RINKEBYURL),
                null,
                OPTIONS
            );   
        // eth = new Eth(new Eth.providers.HttpProvider('https://rinkeby.infura.io'));
        // accounts = new Accounts('https://rinkeby.infura.io');       
    }

    async registerParts(req, res){

    try{
        var req_data = req.body

            var pk = (req_data.private_key);
            // var pk = pk.replace("0x", "");

            var nonce = await web3.eth.getTransactionCount(req_data.owner_address);
            var nonceHex = web3.utils.toHex(nonce);

            var PMContract = new web3.eth.Contract(PMAbi, '0xd90ad1E33E680E5A750754784D3f9C7565EdCe7d', {
                from: req_data.owner_address
            });

            var tx = new Tx({
                nonce: nonceHex,
                value: null,
                gasPrice: web3.utils.toHex(gasPriceGwei * 1e9),
                gasLimit: web3.utils.toHex(gasLimit),
                from: req_data.owner_address,
                to: '0xd90ad1E33E680E5A750754784D3f9C7565EdCe7d',
                chainId: web3.utils.toHex(process.env.CHAINID),
                data: PMContract.methods.registerParts(web3.utils.fromAscii(req_data.type_of_parts), web3.utils.fromAscii(req_data.fac_name), req_data.fac_id, req_data.manufacture_date, req_data.serial_no, req_data.owner_address).encodeABI()
            });

            tx.sign(new Buffer(pk, 'hex'));

            await web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'))
                .then(async function (receipt) {
                    console.log(receipt);
                    res.json({'status':'200', 'message':"Successfully register parts", 'data': receipt})
                });        

            }catch(err){
                console.log("err", err);
            }           
    }

    async getParts(req, res){

        var req_data = req.body;

        var PMContract = new web3.eth.Contract(PMAbi, '0xd90ad1E33E680E5A750754784D3f9C7565EdCe7d', {
            from: req_data.owner_address
        });

        PMContract.methods.getParts().call()
        .then(async function (response) {
            console.log(response);
            res.json({'status':'200', 'message':"List register parts", 'data': response})
        });      

    }

    async getPart(req, res){

        var req_data = req.body;

        var PMContract = new web3.eth.Contract(PMAbi, '0xd90ad1E33E680E5A750754784D3f9C7565EdCe7d', {
            from: req_data.owner_address
        });

        PMContract.methods.getPart(req_data.part).call()
        .then(async function (response) {
            console.log(response);
            res.json({'status':'200', 'message':"List register part", 'data': response})
        });      

    }

    async changeOwnershipParts(req, res){
        try{
            var req_data = req.body

            var pk = (req_data.private_key);
            // var pk = pk.replace("0x", "");

            var nonce = await web3.eth.getTransactionCount(req_data.owner_address);
            var nonceHex = web3.utils.toHex(nonce);

            var PMContract = new web3.eth.Contract(PMAbi, '0xd90ad1E33E680E5A750754784D3f9C7565EdCe7d', {
                from: req_data.owner_address
            });

            var tx = new Tx({
                nonce: nonceHex,
                value: null,
                gasPrice: web3.utils.toHex(gasPriceGwei * 1e9),
                gasLimit: web3.utils.toHex(gasLimit),
                from: req_data.owner_address,
                to: '0xd90ad1E33E680E5A750754784D3f9C7565EdCe7d',
                chainId: web3.utils.toHex(process.env.CHAINID),
                data: PMContract.methods.changeOwnershipParts(req_data.serial_no, req_data.new_owner_address).encodeABI()
            });

            tx.sign(new Buffer(pk, 'hex'));

            await web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'))
                .then(async function (receipt) {
                    console.log(receipt);
                    res.json({'status':'200', 'message':"Successfully change Ownership of part", 'data': receipt})
                });        

            }catch(err){
                console.log("err", err);
            }        

    }


    async registerProducts(req, res){

        try{
            var req_data = req.body
    
                var pk = (req_data.private_key);
                // var pk = pk.replace("0x", "");
    
                var nonce = await web3.eth.getTransactionCount(req_data.owner_address);
                var nonceHex = web3.utils.toHex(nonce);
    
                var PMContract = new web3.eth.Contract(PMAbi, '0xd90ad1E33E680E5A750754784D3f9C7565EdCe7d', {
                    from: req_data.owner_address
                });
    
                var tx = new Tx({
                    nonce: nonceHex,
                    value: null,
                    gasPrice: web3.utils.toHex(gasPriceGwei * 1e9),
                    gasLimit: web3.utils.toHex(gasLimit),
                    from: req_data.owner_address,
                    to: '0xd90ad1E33E680E5A750754784D3f9C7565EdCe7d',
                    chainId: web3.utils.toHex(process.env.CHAINID),
                    data: PMContract.methods.registerProducts(web3.utils.fromAscii(req_data.type_of_products), web3.utils.fromAscii(req_data.fac_name), req_data.fac_id, req_data.manufacture_date, req_data.serial_no, req_data.wheels_serial_no, req_data.body_parts_serial_no, req_data.engine_serial_no, req_data.transmission_serial_no, req_data.owner_address).encodeABI()
                });
    
                tx.sign(new Buffer(pk, 'hex'));
    
                await web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'))
                    .then(async function (receipt) {
                        console.log(receipt);
                        res.json({'status':'200', 'message':"Successfully register products", 'data': receipt})
                    });        
    
                }catch(err){
                    console.log("err", err);
                }           
        }
    
        async getProducts(req, res){
    
            var req_data = req.body;
    
            var PMContract = new web3.eth.Contract(PMAbi, '0xd90ad1E33E680E5A750754784D3f9C7565EdCe7d', {
                from: req_data.owner_address
            });
    
            PMContract.methods.getProducts().call()
            .then(async function (response) {
                console.log(response);
                res.json({'status':'200', 'message':"List register Products", 'data': response})
            });      
    
        }
    
        async getProduct(req, res){
    
            var req_data = req.body;
    
            var PMContract = new web3.eth.Contract(PMAbi, '0xd90ad1E33E680E5A750754784D3f9C7565EdCe7d', {
                from: req_data.owner_address
            });
    
            PMContract.methods.getProduct(req_data.product).call()
            .then(async function (response) {
                console.log(response);
                res.json({'status':'200', 'message':"List register Product", 'data': response})
            });      
    
        }
    
        async changeOwnershipProducts(req, res){
            try{
                var req_data = req.body
    
                var pk = (req_data.private_key);
                // var pk = pk.replace("0x", "");
    
                var nonce = await web3.eth.getTransactionCount(req_data.owner_address);
                var nonceHex = web3.utils.toHex(nonce);
    
                var PMContract = new web3.eth.Contract(PMAbi, '0xd90ad1E33E680E5A750754784D3f9C7565EdCe7d', {
                    from: req_data.owner_address
                });
    
                var tx = new Tx({
                    nonce: nonceHex,
                    value: null,
                    gasPrice: web3.utils.toHex(gasPriceGwei * 1e9),
                    gasLimit: web3.utils.toHex(gasLimit),
                    from: req_data.owner_address,
                    to: '0xd90ad1E33E680E5A750754784D3f9C7565EdCe7d',
                    chainId: web3.utils.toHex(process.env.CHAINID),
                    data: PMContract.methods.changeOwnershipProducts(req_data.serial_no, req_data.new_owner_address).encodeABI()
                });
    
                tx.sign(new Buffer(pk, 'hex'));
    
                await web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'))
                    .then(async function (receipt) {
                        console.log(receipt);
                        res.json({'status':'200', 'message':"Successfully change Ownership of Product", 'data': receipt})
                    });        
    
                }catch(err){
                    console.log("err", err);
                }        
    
        }


}

module.exports = new PMContract();