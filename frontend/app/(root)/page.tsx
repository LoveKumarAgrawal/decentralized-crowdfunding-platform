"use client"

import { abi } from "@/lib/abi"
import { useAccount, useReadContract } from "wagmi"
import CampaignCard from "@/components/CampaignCard"
import { useRouter } from "next/navigation";

export interface Campaign {
    randomId: bigint;
    owner: string;
    title: string;
    description: string;
    target: bigint;
    deadline: bigint;
    amountCollected: bigint;
    image: string;
    funders: string[];
    donations: bigint[];
}

export default function Home() {
    const router = useRouter()
    const { address } = useAccount()

    const { data: campaigns, isPending } = useReadContract({
        address: `0x${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`,
        abi,
        functionName: 'getCampaigns',
        args: [],
    })

    if (isPending) {
        return <div>Loading</div>
    }

    const typedCampaign = (campaigns as Campaign[])

    const handleNavigate = (randomId: bigint) => {
        router.push(`/campaign-detail/${randomId}`)
    }

    return (
        <div className="dark:bg-[#1c1c24] min-h-[661px]">
            <div className="text-4xl font-bold text-center">
                All Campaigns ({typedCampaign && typedCampaign?.length > 0 ? typedCampaign.filter((campaign) => campaign.owner !== address).length : ""})
            </div>
            <div className="sm:p-8 p-4">
                {typedCampaign && typedCampaign?.length > 0 ? (

                    <div className="flex flex-wrap gap-4">
                        {typedCampaign.filter((campaign) => campaign.owner !== address).map((campaign) => (
                            <CampaignCard campaign={campaign} handleClick={handleNavigate} key={campaign.randomId} />
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
