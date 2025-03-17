"use client"

import { abi } from "@/lib/abi"
import { useReadContract } from "wagmi"
import CampaignCard from "@/components/CampaignCard"
import { Campaign } from "./my-campaigns/page"

export default function Main() {
    const { data: campaigns, isPending } = useReadContract({
        address: `0x${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`,
        abi,
        functionName: 'getCampaigns',
        args: [],
    })
    console.log(campaigns)

    if (isPending) {
        return <div>Loading</div>
    }

    const typedCampaign = campaigns as Campaign[]
  return (
    <>
    <div className="dark:bg-[#1c1c24] h-full">
            <div className="text-4xl font-bold text-center">
            All Campaigns ({typedCampaign && typedCampaign?.length > 0 ? typedCampaign.length : ""})
          </div>
        <div className="sm:p-8 p-4">
            {typedCampaign && typedCampaign?.length > 0 ? (
                
                <div className="flex flex-wrap gap-4">
                    {typedCampaign.map((campaign, index) => (
                        <CampaignCard {...campaign} key={index} />
                    ))}
                </div>
            ) : (
                <div className="font-epilogue font-semibold text-4xl leading-[30px] text-[#818183] text-center">
                    Sorry! does not have any campaigns
                </div>
            )}
        </div>
        </div>
        </>
  );
}
