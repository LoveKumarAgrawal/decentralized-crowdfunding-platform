"use client"
import CampaignCard from "@/components/CampaignCard";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount, useReadContract } from "wagmi"
import { abi } from "@/lib/abi";
import { Campaign } from "../page";


const MyCampaigns = () => {

    const { isConnected, address } = useAccount()
    const router = useRouter()

    const { data: campaigns } = useReadContract({
        address: `0x${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`,
        abi,
        functionName: 'getMyCampaigns',
        args: [address],
    })


    const handleNavigate = (randomId: bigint) => {
        router.push(`/campaign-detail/${randomId}`)
    }
    const typedCampaign = (campaigns as Campaign[])

    useEffect(() => {
        if (!isConnected) {
            router.push("/");
        }
    }, [isConnected, router]);

    if (!isConnected) return null;

    return (
        <div className="dark:bg-[#1c1c24] min-h-[661px]">
            <div className="text-4xl font-bold text-center">
                Your Campaigns ({typedCampaign && typedCampaign?.length > 0 ? typedCampaign.length : ""})
            </div>
            <div className="sm:p-8 p-4">
                {typedCampaign && typedCampaign?.length > 0 ? (

                    <div className="flex flex-wrap gap-4">
                        {typedCampaign.map((campaign, index) => (
                            <CampaignCard campaign={campaign} handleClick={handleNavigate} key={index} />
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