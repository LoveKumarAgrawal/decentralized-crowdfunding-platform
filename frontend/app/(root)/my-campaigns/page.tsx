"use client"
import CampaignCard from "@/components/CampaignCard";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useAccount, useReadContract } from "wagmi"
import { abi } from "@/lib/abi";
import { Campaign } from "../all-campaigns/page";

const MyCampaigns = () => {

    const { isConnected, address } = useAccount()
    const router = useRouter()

    const { data: campaigns } = useReadContract({
        address: `0x${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`,
        abi,
        functionName: 'getMyCampaigns',
        args: [address],
    })

    const typedCampaigns = useMemo(() => campaigns as Campaign[] ?? [], [campaigns]);

    useEffect(() => {
        if (!isConnected) {
            redirect("/");
        }
    }, [isConnected]);

    if (!isConnected) return null;

    return (
        <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-center">
            Your Campaigns {typedCampaigns.length > 0 && `(${typedCampaigns.length})`}
            </div>
            <div className="sm:p-8 p-4">
            {typedCampaigns.length > 0 ? (

                    <div className="flex flex-wrap gap-4 justify-center">
                        {typedCampaigns.map((campaign, index) => (
                            <CampaignCard key={index} campaign={campaign} handleClick={(id) => router.push(`/campaign-detail/${id}`)} />
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