const fs = require("fs");
const ethers = require("ethers");

async function main() {
  const provider = new ethers.JsonRpcProvider("http://172.22.112.1:7545");
  const wallet = new ethers.Wallet(
    "0x82a1c161b5ac80fc8facc81b0aee286ec838f5408f0805c5e4d12b1935f4019d",
    provider
  );

  const abi = fs.readFileSync(
    "./dist/contracts_SimpleStorage_sol_SimpleStorage.abi",
    "utf8"
  );

  const binary = fs.readFileSync(
    "./dist/contracts_SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");

  const contract = await contractFactory.deploy({ gasLimit: 3000000 });
  console.log(contract);

  const deploymentReceipt = await contract.deploymentTransaction().wait(1);
  console.log(deploymentReceipt);

  const currentFavoriteNumber = await contract.retrieve();
  console.log(`Current Favorite Number: ${currentFavoriteNumber}`);

  const transactionResponse = await contract.store("7");
  const transactionReceipt = await transactionResponse.wait();
  const updatedFavoriteNumber = await contract.retrieve();
  console.log(`Updated Favorite Number: ${updatedFavoriteNumber}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
