"use client"

import { abi } from "@/lib/abi"
import { useReadContract } from "wagmi"
import CampaignCard from "@/components/CampaignCard"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { useEffect } from "react"
import { ClientCampaign, setCampaigns } from "@/lib/features/campaignSlice"
import { formatEther } from "viem"

export interface Campaign {
    owner: string;
    title: string;
    description: string;
    target: bigint;
    deadline: bigint;
    amountCollected: bigint;
    image: string;
    funders: string[];
    donations: number[];
}

export default function Home() {
    const dispatch = useAppDispatch()
    const typedCampaign: ClientCampaign[] = useAppSelector((state) => state.campaigns.campaigns)

    const { data: campaigns, isPending } = useReadContract({
        address: `0x${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`,
        abi,
        functionName: 'getCampaigns',
        args: [],
    })

    useEffect(() => {
        if (campaigns && !isPending) {
            const typedCampaign = (campaigns as Campaign[]).map((campaign: Campaign) => ({
                ...campaign,
                target: formatEther(campaign.target), // Convert target to ether string
                amountCollected: formatEther(campaign.amountCollected), // Convert amountCollected to ether string
                deadline: Number(campaign.deadline) // Convert deadline to number
            }));
            dispatch(setCampaigns(typedCampaign))
        }
    }, [campaigns, isPending, dispatch])

    if (isPending) {
        return <div>Loading</div>
    }

    // Get campaigns from Redux store using useAppSelector
    return (
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
    );
}
