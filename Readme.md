# FVMCall

FVMCall empowers Web3 developers by providing a user-friendly interface to automate and manage smart contract functions effortlessly on FVM.

[demo video]()

[live link]()

## Technologies Used

### FVM Calibration

Contrat was deployed on Filecoin Calibration testnet.

[Contract link](https://calibration.filfox.info/en/address/0xC3F51a90Cb9403107462238f66A0442c372c1796)

### Push

Leveraged Push to send notifications to user after execution of a job.

[code](https://github.com/VaibhavArora19/hackFS/blob/main/backend/push/index.js)

### Lit Protocol

Leveraged the LIT PKPS to provide users with the convenience of using their Google accounts for authentication within the FVMCall Dapp.

[code](https://github.com/VaibhavArora19/hackFS/blob/main/frontend/components/LIT/LIT.js)

### ENS

Utilized the Ethereum Name Service (ENS) to retrieve and display the name and profile image associated with a connected wallet address.

[code](https://github.com/VaibhavArora19/hackFS/blob/main/frontend/components/ENS/index.js)

### Polybase

FVMCall made full use of Polybase to efficiently store all job-related information.

[code](https://github.com/VaibhavArora19/hackFS/blob/main/backend/helpers/polybaseQueries.js)

### Drand

In order to facilitate the execution of jobs requiring random number generation, FVMCall integrated Drand randomness for reliable and secure random number support.

[code](https://github.com/VaibhavArora19/hackFS/blob/main/frontend/components/Drand/index%20.js)
