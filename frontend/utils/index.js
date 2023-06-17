import { contractABI, contractAddress } from "@/constants";
import { waitForTransaction } from "@wagmi/core";
import { ethers } from "ethers";
import { writeContract } from "@wagmi/core";

export const getContract = async (signer) => {
  return new ethers.Contract(contractAddress, contractABI, signer);
};
export const registerKeeper = async (address, amount, pkpWallet) => {
  try {
    if (pkpWallet != "") {
      await pkpRegisterKeeper(pkpWallet, address, amount);
    } else {
      const amountInWei = ethers.utils.parseEther(amount);
      const { hash } = await writeContract({
        address: contractAddress,
        abi: contractABI,
        functionName: "registerKeeper",
        args: [address, amountInWei],
        value: amountInWei,
      });
      await waitForTransaction({
        hash: hash,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const pkpRegisterKeeper = async (signer, address, amount) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://rpc.ankr.com/filecoin_testnet"
    );

    const amountInWei = ethers.utils.parseEther(amount);

    const contract = await getContract(provider);
    const unsignedTransaction =
      await contract.populateTransaction.registerKeeper(address, amountInWei);
    const data = unsignedTransaction.data;

    let nonce = await provider.getTransactionCount(signer.address);
    console.log("Nonce:", nonce);

    let feeData = await provider.getFeeData();
    console.log("Fee Data:", feeData);

    const tx = {
      type: 2,
      nonce: nonce,
      from: signer.address,
      to: contractAddress, // Address to send to
      gasLimit: 1000000000,
      value: amountInWei, // Amount to send
      maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
      gasPrice: feeData.maxFeePerGas,
      maxFeePerGas: feeData.maxFeePerGas,
      chainId: 314159,
      data: data,
    };
    console.log("Transaction Data:", tx);

    const signedTx = await signer.signTransaction(tx);
    console.log("Signed Transaction:", signedTx);

    const txHash = ethers.utils.keccak256(signedTx);
    console.log("Precomputed txHash:", txHash);

    provider.sendTransaction(signedTx).then(async (tx) => {
      await tx.wait();
    });
  } catch (err) {
    console.log(err);
  }
};

// export const deposit = async (signer, address, amount) => {
//   try {
//     const contract = await getContract(signer);
//     const amountInWei = ethers.utils.parseEther(amount);
//     const tx = await contract.deposit(address, {
//       value: amountInWei,
//     });
//     await tx.wait();
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const withdraw = async (signer, address, amount) => {
//   try {
//     const contract = await getContract(signer);
//     const amountInWei = ethers.utils.parseEther(amount);
//     const tx = await contract.withdraw(address, amountInWei);
//     await tx.wait();
//   } catch (err) {
//     console.log(err);
//   }
// };
