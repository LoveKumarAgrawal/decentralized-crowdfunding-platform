"use client"

import { abi } from "@/lib/abi"
import { useAccount, useReadContract } from "wagmi"
import CampaignCard from "@/components/CampaignCard"
import { useRouter } from "next/navigation";
import { useMemo } from "react";

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

const AllCampaigns = () => {
    const router = useRouter()
    const { address } = useAccount()

    const { data: campaigns, isPending } = useReadContract({
        address: `0x${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`,
        abi,
        functionName: 'getCampaigns',
        args: [],
    })

    const filteredCampaigns = useMemo(() => {
        if(!campaigns) return [];
        return (campaigns as Campaign[]).filter(
            (campaign) => campaign.owner !== address
        )
    }, [address, campaigns])

    if (isPending) {
        return <div>Loading</div>
    }
    const handleNavigate = (randomId: bigint) => {
        router.push(`/campaign-detail/${randomId}`)
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-full w-full">
            <div className="text-4xl font-bold text-center dark:text-white">
                All Campaigns ({filteredCampaigns && filteredCampaigns?.length > 0 ? filteredCampaigns.length : ""})
            </div>
            <div className="sm:p-8 p-4">
                {filteredCampaigns && filteredCampaigns?.length > 0 ? (

                    <div className="flex flex-wrap gap-4 justify-center">
                        {filteredCampaigns.map((campaign) => (
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

export default AllCampaigns;
