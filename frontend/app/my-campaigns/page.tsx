"use client"
import CampaignCard from "@/components/CampaignCard";
import { abi } from "@/lib/abi"
import { useAccount, useReadContract } from "wagmi"

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


const page = () => {

    const { address } = useAccount()

    const { data: campaigns, isPending } = useReadContract({
        address: `0x${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`,
        abi,
        functionName: 'getMyCampaigns',
        args: [address],
    })
    console.log(campaigns)

    if (isPending) {
        return <div>Loading</div>
    }

    const typedCampaign = campaigns as Campaign[]

    return (
        <div className="mt-3.5 px-3.5">
            {typedCampaign && typedCampaign?.length > 0 ? (

                <div className="flex flex-wrap gap-4">
                    {typedCampaign.map((campaign, index) => (
                        <CampaignCard {...campaign} key={index} />
                    ))}
                </div>
            ) : (
                <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
                    You have not created any campigns yet
                </p>
            )}
        </div>
    );
}

export default page