const fs = require("fs");

const ethers = require("ethers");
const dotenv = require("dotenv");

dotenv.config();

async function main() {
  const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8");
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

  let wallet = ethers.Wallet.fromEncryptedJsonSync(
    encryptedJson,
    process.env.PRIVATE_KEY_PASSWORD
  );

  wallet = wallet.connect(provider);

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
