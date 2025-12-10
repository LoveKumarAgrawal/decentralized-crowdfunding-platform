# 🚀 Decentralized Crowdfunding Platform

A full-stack decentralized crowdfunding application built on Ethereum blockchain, enabling transparent and trustless fundraising campaigns. This platform combines the power of smart contracts with a modern, responsive web interface to revolutionize how crowdfunding works.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Smart Contract Details](#smart-contract-details)
- [Contributing](#contributing)

## 🌟 Overview

This decentralized crowdfunding platform eliminates intermediaries by leveraging blockchain technology. Campaign creators can launch fundraising campaigns, and backers can contribute directly through their crypto wallets. All transactions are transparent, immutable, and secured by the Ethereum blockchain.

**Key Benefits:**
- 🔒 **Trustless**: No intermediaries, funds go directly to campaign owners
- 🌐 **Transparent**: All transactions are publicly verifiable on the blockchain
- 💰 **Low Fees**: Minimal gas fees compared to traditional platform fees (3-5%)
- 🔐 **Secure**: Smart contract ensures funds are transferred safely
- 🌍 **Global**: Anyone with a wallet can participate from anywhere

## ✨ Features

### For Campaign Creators
- Create campaigns with title, description, target amount, deadline, and image
- Receive donations directly to your wallet
- Track campaign progress in real-time
- View all your campaigns in one place
- Automatic random campaign ID generation for security

### For Backers
- Browse all active campaigns
- View detailed campaign information
- Contribute any amount via MetaMask
- View contribution history for each campaign
- Real-time updates on campaign progress

### Technical Features
- Unique random campaign IDs for enhanced security
- Donation tracking with funder addresses and amounts
- Campaign filtering (all campaigns, my campaigns)
- Responsive design with dark/light mode
- Real-time blockchain synchronization

## 🛠 Tech Stack

### Smart Contract (Backend)
- **Solidity ^0.8.13** - Smart contract language
- **Foundry** - Development framework for testing and deployment
- **Anvil** - Local Ethereum node for development

### Frontend
- **Next.js 15.2** - React framework with App Router
- **TypeScript** - Type-safe development
- **Wagmi 2.14** - React hooks for Ethereum
- **Viem 2.23** - TypeScript Ethereum library
- **TanStack Query 5.67** - Data fetching and caching
- **Tailwind CSS 4** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Next Themes** - Dark mode support
- **React Toastify** - Toast notifications

## 📁 Project Structure

```
CrowdFunding/
├── contract/                 # Smart contract development
│   ├── src/
│   │   └── CrowdFunding.sol # Main smart contract
│   ├── test/
│   │   └── CrowdFunding.t.sol # Contract tests
│   ├── lib/
│   │   └── forge-std/       # Foundry standard library
│   ├── foundry.toml         # Foundry configuration
│   └── script/              # Deployment scripts
│
└── frontend/                # Next.js application
    ├── app/                 # App router pages
    │   ├── (root)/
    │   │   ├── page.tsx             # Homepage
    │   │   ├── all-campaigns/       # Browse campaigns
    │   │   ├── my-campaigns/        # User's campaigns
    │   │   ├── create-campaign/     # Create new campaign
    │   │   └── campaign-detail/[id]/ # Campaign details
    │   ├── config.ts        # Wagmi configuration
    │   └── providers.tsx    # App providers
    ├── components/          # React components
    │   ├── CampaignCard.tsx
    │   ├── FormField.tsx
    │   ├── Navbar.tsx
    │   └── ui/             # UI components
    ├── lib/
    │   ├── abi.ts          # Contract ABI
    │   ├── index.ts        # Utility functions
    │   └── utils.ts        # Helper functions
    └── package.json
```

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Foundry** - Ethereum development toolkit
  ```bash
  # Install Foundry
  curl -L https://foundry.paradigm.xyz | bash
  foundryup
  ```
- **MetaMask** browser extension - [Install](https://metamask.io/)
- **Git** - [Download](https://git-scm.com/)

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/LoveKumarAgrawal/decentralized-crowdfunding-platform.git
cd decentralized-crowdfunding-platform
```

### 2. Smart Contract Setup

```bash
cd contract
forge install
forge build
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
# or
yarn install
```

### 4. Environment Configuration

Create a `.env` file in the `frontend` directory (copy from `.env.example`):

```bash
cp .env.example .env
```

Edit `.env` and add your contract address (you'll get this after deployment):

```env
NEXT_PUBLIC_CONTRACT_ADDRESS="your_deployed_contract_address"
```

## 🚀 Running the Application

Follow these steps in order to run the complete application:

### Step 1: Start Local Blockchain

Open a terminal and start Anvil (local Ethereum node):

```bash
cd contract
anvil
```

**Important**: Keep this terminal running. Anvil will display 10 test accounts with private keys. The first account's private key is used for deployment.

### Step 2: Deploy Smart Contract

Open a **new terminal** and deploy the contract:

```bash
cd contract
forge create --rpc-url http://127.0.0.1:8545 --private-key anvil_private_key src/CrowdFunding.sol:CrowdFunding --broadcast
```

**Note**: The private key above is the default first account from Anvil (safe for local development only, **never** use in production).

After deployment, you'll see output like:

```
Deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

Copy the deployed contract address.

### Step 3: Update Environment Variables

Update `frontend/.env` with your deployed contract address:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS="0x5FbDB2315678afecb367f032d93F642f64180aa3"
```

### Step 4: Start Frontend

Open a **third terminal** and start the Next.js development server:

```bash
cd frontend
npm run dev
# or
yarn dev
```

The application will be available at: **http://localhost:3000**

### Step 5: Configure MetaMask

1. Open MetaMask and add a custom network:
   - **Network Name**: Anvil Local
   - **RPC URL**: `http://127.0.0.1:8545`
   - **Chain ID**: `31337`
   - **Currency Symbol**: ETH

2. Import a test account from Anvil:
   - Copy one of the private keys from the Anvil terminal
   - In MetaMask: Click Account → Import Account → Paste private key

3. Connect MetaMask to the application and start using it!

## 🎯 Usage Guide

### Creating a Campaign

1. Connect your MetaMask wallet
2. Navigate to "Create Campaign"
3. Fill in the campaign details:
   - **Title**: Campaign name
   - **Description**: Detailed description
   - **Target Amount**: Goal in ETH
   - **Deadline**: End date for the campaign
   - **Image URL**: Campaign banner image
4. Click "Create Campaign" and approve the transaction

### Donating to a Campaign

1. Browse campaigns from "All Campaigns"
2. Click on a campaign to view details
3. Enter donation amount in ETH
4. Click "Donate" and approve the MetaMask transaction
5. Funds are instantly transferred to the campaign owner

### Viewing Your Campaigns

- Navigate to "My Campaigns" to see all campaigns you've created
- Track progress, donations, and campaign status

## 📝 Smart Contract Details

### Contract: `CrowdFunding.sol`

**Main Functions:**

- `createCampaign()` - Create a new fundraising campaign
- `donateToCampaign()` - Contribute ETH to a campaign
- `getCampaigns()` - Retrieve all campaigns
- `getMyCampaigns()` - Get campaigns by owner
- `getCampaignById()` - Get specific campaign details
- `getDonators()` - View all funders and donation amounts

**Events:**

- `CampaignCreated` - Emitted when a new campaign is created
- `DonationReceived` - Emitted when a donation is made

**Security Features:**

- Deadline validation (must be in the future)
- Donation amount validation (must be > 0)
- Direct fund transfer to campaign owner
- Random campaign ID generation for uniqueness

### Running Tests

```bash
cd contract
forge test
```

For detailed test output:

```bash
forge test -vvv
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Developer

**Love Kumar Agrawal**

- GitHub: [@LoveKumarAgrawal](https://github.com/LoveKumarAgrawal)
- Repository: [decentralized-crowdfunding-platform](https://github.com/LoveKumarAgrawal/decentralized-crowdfunding-platform)

## 🙏 Acknowledgments

- Foundry team for the excellent development framework
- Wagmi and Viem for simplified Ethereum interactions
- Next.js team for the amazing React framework
- The Ethereum community for continuous innovation

---

⭐ If you found this project helpful, please consider giving it a star!

**Built with ❤️ using Blockchain Technology**
