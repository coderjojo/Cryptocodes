const SHA256 = require('crypto-js/sha256');

class block{
	constructor(index, timestamp, data, prevHash = ''){
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
		this.prevHash = prevHash;
		this.hash = this.calculateHash();
	}

	calculateHash(){
		return SHA256(this.index + this.prevHash + this.timestamp + JSON.stringify(this.data)).toString();
	}
}

class Blockchain{
	constructor(){
		this.chain = [this.createGenBlock()];
	}
	createGenBlock(){
		return new block(0,"07/01/2020", "Gen Block","0") 	
	}
	getLatestBlock(){
		return this.chain[this.chain.length - 1];
	}
	addBlock(newBlock){
		newBlock.prevHash = this.getLatestBlock().hash;
		newBlock.hash = newBlock.calculateHash();
		this.chain.push(newBlock);
	}

	isChainValid(){
		for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash.toString() == currentBlock.calculateHash().toString()) {
                return false;
            }

            if (currentBlock.previousHash == previousBlock.hash.toString()) {
                return false;
            }
        }

        return true;
    }
 
}


let mycoin = new Blockchain();
mycoin.addBlock(new block(1,"09/01/2020", {amount: 4}));
mycoin.addBlock(new block(2,"10/01/2020", {amount: 2}));

//console.log(JSON.stringify(mycoin, null,4));

console.log('Blockchain valid?' + mycoin.isChainValid());
 
