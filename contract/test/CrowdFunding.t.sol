// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {CrowdFunding} from "../src/CrowdFunding.sol";

contract CrowdFundingTest is Test {
    CrowdFunding public crowdFunding;
    address public owner;
    address public funder1;
    address public funder2;

    uint256 public campaignId;

    function setUp() public {
        crowdFunding = new CrowdFunding();
        owner = address(0x123);
        funder1 = address(0x456);
        funder2 = address(0x789);
        
        // Create a campaign for testing
        uint256 target = 1000;
        uint256 deadline = block.timestamp + 1 days;
        string memory title = "Test Campaign";
        string memory description = "This is a test campaign";
        string memory image = "https://example.com/image.jpg";

        crowdFunding.createCampaign(owner, title, description, target, deadline, image);
        campaignId = 0; // The first campaign created will have id 0
    }

    function testCreateCampaign() public view {
        // Use the getter function to get the campaign details
        (
            address campaignOwner,
            string memory campaignTitle,
            string memory campaignDescription,
            uint256 campaignTarget,
            uint256 campaignDeadline,
            uint256 campaignAmountCollected,
            string memory campaignImage
        ) = crowdFunding.campaigns(campaignId);

        // Assert campaign was created and values match
        assertEq(campaignOwner, owner);
        assertEq(campaignTitle, "Test Campaign");
        assertEq(campaignDescription, "This is a test campaign");
        assertEq(campaignTarget, 1000);
        assertEq(campaignDeadline, block.timestamp + 1 days);
        assertEq(campaignAmountCollected, 0);  // No funds yet
        assertEq(campaignImage, "https://example.com/image.jpg");
    }

}
