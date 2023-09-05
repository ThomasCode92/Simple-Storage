const { ethers, run, network } = require('hardhat');
const dotenv = require('dotenv');

dotenv.config();

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
  const simpleStorage = await SimpleStorageFactory.deploy();

  console.log('Deploying contract...');

  await simpleStorage.waitForDeployment();
  console.log(`Deployed contract to: ${simpleStorage.target}`);

  if (process.env.ETHERSCAN_API_KEY && network.config.chainId === 11155111) {
    await simpleStorage.deploymentTransaction().wait(6);
    await verify(simpleStorage.target);
  }

  const currentValue = await simpleStorage.retrieve();
  console.log(`Current value is: ${currentValue}`);

  const transactionResponse = await simpleStorage.store(7);
  await transactionResponse.wait(1);

  const updatedValue = await simpleStorage.retrieve();
  console.log(`Updated value is: ${updatedValue}`);
}

async function verify(contractAddress, args) {
  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (error) {
    if (error.message.toLowerCase().includes('already verified')) {
      return console.log('Already Verified');
    }

    console.error(error);
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.log(error);
    process.exit(1);
  });
