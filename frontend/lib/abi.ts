export const abi = [
    {
        "type": "function",
        "name": "campaigns",
        "inputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "randomId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "owner",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "title",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "description",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "target",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "deadline",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "amountCollected",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "image",
                "type": "string",
                "internalType": "string"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "createCampaign",
        "inputs": [
            {
                "name": "_owner",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "_title",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "_description",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "_target",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "_deadline",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "_image",
                "type": "string",
                "internalType": "string"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "donateToCampaign",
        "inputs": [
            {
                "name": "_randomId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "getCampaignById",
        "inputs": [
            {
                "name": "_randomId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple",
                "internalType": "struct CrowdFunding.Campaign",
                "components": [
                    {
                        "name": "randomId",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "owner",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "title",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "description",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "target",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "deadline",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "amountCollected",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "image",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "funders",
                        "type": "address[]",
                        "internalType": "address[]"
                    },
                    {
                        "name": "donations",
                        "type": "uint256[]",
                        "internalType": "uint256[]"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getCampaigns",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "tuple[]",
                "internalType": "struct CrowdFunding.Campaign[]",
                "components": [
                    {
                        "name": "randomId",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "owner",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "title",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "description",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "target",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "deadline",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "amountCollected",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "image",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "funders",
                        "type": "address[]",
                        "internalType": "address[]"
                    },
                    {
                        "name": "donations",
                        "type": "uint256[]",
                        "internalType": "uint256[]"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getDonators",
        "inputs": [
            {
                "name": "_id",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "address[]",
                "internalType": "address[]"
            },
            {
                "name": "",
                "type": "uint256[]",
                "internalType": "uint256[]"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getMyCampaigns",
        "inputs": [
            {
                "name": "_owner",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple[]",
                "internalType": "struct CrowdFunding.Campaign[]",
                "components": [
                    {
                        "name": "randomId",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "owner",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "title",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "description",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "target",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "deadline",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "amountCollected",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "image",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "funders",
                        "type": "address[]",
                        "internalType": "address[]"
                    },
                    {
                        "name": "donations",
                        "type": "uint256[]",
                        "internalType": "uint256[]"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "numberOfCampaigns",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "event",
        "name": "CampaignCreated",
        "inputs": [
            {
                "name": "campaignId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "owner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "title",
                "type": "string",
                "indexed": false,
                "internalType": "string"
            },
            {
                "name": "target",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "deadline",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "image",
                "type": "string",
                "indexed": false,
                "internalType": "string"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "DonationReceived",
        "inputs": [
            {
                "name": "campaignId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "donor",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "amount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    }
]