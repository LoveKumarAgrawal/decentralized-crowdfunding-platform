// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract CrowdFunding {
    struct Campaign {
        uint256 randomId;
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] funders;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns = 0;

    event CampaignCreated(
        uint256 indexed campaignId,
        address indexed owner,
        string title,
        uint256 target,
        uint256 deadline,
        string image
    );

    event DonationReceived(
        uint256 indexed campaignId,
        address indexed donor,
        uint256 amount
    );

    function generateRandomId(address _owner, uint256 _target) internal view returns (uint256) {
        return uint256(
            keccak256(
                abi.encodePacked(block.timestamp, _owner, _target, numberOfCampaigns)
            )
        ) % (10**18);
    }

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public {
        require(
            _deadline > block.timestamp,
            "The deadline should be a date in the future."
        );

        // Generate a random campaign ID
        uint256 randomId = generateRandomId(_owner, _target);

        Campaign storage campaign = campaigns[numberOfCampaigns];
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.image = _image;
        campaign.amountCollected = 0;
        campaign.randomId = randomId;

        emit CampaignCreated(
            numberOfCampaigns,
            _owner,
            _title,
            _target,
            _deadline,
            _image
        );

        numberOfCampaigns++;
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for (uint i = 0; i < numberOfCampaigns; i++) {
            Campaign storage campaign = campaigns[i];
            allCampaigns[i] = campaign;
        }

        return allCampaigns;
    }

    function getMyCampaigns(
        address _owner
    ) public view returns (Campaign[] memory) {
        uint256 userCampaignCount = 0;
        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            if (campaigns[i].owner == _owner) {
                userCampaignCount++;
            }
        }

        // Create an array to store the user's campaigns
        Campaign[] memory userCampaigns = new Campaign[](userCampaignCount);
        uint256 index = 0;

        // Loop again to fill the user's campaigns in the array
        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            if (campaigns[i].owner == _owner) {
                userCampaigns[index] = campaigns[i];
                index++;
            }
        }

        return userCampaigns;
    }

    function getCampaignById(uint256 _randomId) public view returns (Campaign memory) {
        for(uint256 i=0; i<numberOfCampaigns; i++) {
            if(campaigns[i].randomId ==  _randomId) {
                return campaigns[i];
            }
        }
        // Revert if campaign not found
        revert("Campaign not found");
    }

    function getDonators(
        uint256 _id
    ) public view returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].funders, campaigns[_id].donations);
    }

    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;
        require(amount > 0, "Donation amount must be greater than zero.");

        Campaign storage campaign = campaigns[_id];

        campaign.funders.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent, ) = payable(campaign.owner).call{value: amount}("");
        if (sent) {
            campaign.amountCollected += amount;
            emit DonationReceived(_id, msg.sender, amount);
        }
    }
}
