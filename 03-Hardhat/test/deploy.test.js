const { ethers } = require('hardhat');
const { assert } = require('chai');

describe('SimpleStorage', function () {
  let simpleStorageFactory, simpleStorage;

  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
    simpleStorage = await simpleStorageFactory.deploy();
  });

  it('should start with a favorite number of 0', async function () {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = '0';

    assert.equal(currentValue.toString(), expectedValue);
  });

  it('should update favorite number when store is called', async function () {
    const updatedValue = 7;

    const transactionResponse = await simpleStorage.store(updatedValue);
    await transactionResponse.wait(1);

    const currentValue = await simpleStorage.retrieve();
    const expectedValue = updatedValue.toString();

    assert.equal(currentValue.toString(), expectedValue);
  });
});
