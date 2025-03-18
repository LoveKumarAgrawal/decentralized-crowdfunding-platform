"use client"
import CampaignCard from "@/components/CampaignCard";
import { abi } from "@/lib/abi"
import { ClientCampaign } from "@/lib/features/campaignSlice";
import { useAppSelector } from "@/lib/hooks";
import { useAccount, useReadContract } from "wagmi"


const MyCampaigns = () => {

    const { address } = useAccount()
    const allCampaigns: ClientCampaign[] = useAppSelector((state) => state.campaigns.campaigns)

    
    const myCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

    return (
        <div className="dark:bg-[#1c1c24] h-full">
            <div className="text-4xl font-bold text-center">
                Your Campaigns ({myCampaigns && myCampaigns?.length > 0 ? myCampaigns.length : ""})
            </div>
            <div className="sm:p-8 p-4">
                {myCampaigns && myCampaigns?.length > 0 ? (

                    <div className="flex flex-wrap gap-4">
                        {myCampaigns.map((campaign, index) => (
                            <CampaignCard {...campaign} key={index} />
                        ))}
                    </div>
                ) : (
                    <div className="font-epilogue font-semibold text-4xl leading-[30px] text-[#818183] text-center">
                        You have not created any campigns yet
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyCampaigns