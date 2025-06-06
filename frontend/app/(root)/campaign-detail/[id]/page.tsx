"use client"
import CountBox from "@/components/CountBox";
import { Button } from "@/components/ui/button"
import { abi } from "@/lib/abi";
import { type BaseError, useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { Campaign } from "../../all-campaigns/page";
import { calculateBarPercentage, daysLeft, getDonations } from "@/lib";
import { redirect } from "next/navigation";
import { formatEther, parseEther } from "viem";
import { toast } from "react-toastify"
import { use, useEffect, useMemo, useRef } from "react";

const CampaignDetail = ({ params }: { 
  params: Promise<{ id: string }>
 }) => {

  const { id } = use(params);
  const { isConnected } = useAccount();
  const {
    data: hash,
    error,
    isPending: writePending,
    writeContract,
  } = useWriteContract();

  const { data: campaign } = useReadContract({
    address: `0x${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`,
    abi,
    functionName: "getCampaignById",
    args: [id],
  });

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const value = String(formData.get("value"));
    writeContract({
      address: `0x${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`,
      abi,
      functionName: "donateToCampaign",
      args: [typedCampaign.randomId],
      value: parseEther(value)
    });    
  }

  const typedCampaign = useMemo(() => campaign as Campaign, [campaign])
  const formRef = useRef<HTMLFormElement>(null);
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
  })

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${(error as BaseError).shortMessage || error.message}`, {
        position: 'top-left',
        autoClose: 5000,
      })
    }
    if (isConfirmed) {
      toast.success('Funded successfully', {
        position: 'top-left',
        autoClose: 5000,
      })
      formRef.current?.reset(); // Resets the form fields to their initial values
    }
  }, [error, isConfirmed])

  useEffect(() => {
    if (!isConnected) {
      redirect("/");
    }
  }, [isConnected]);

  if (!isConnected) return null;

  return (
    typedCampaign && <div className="m-auto w-4/5">
      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img src={typedCampaign.image} alt="campaign" className="w-full h-[410px] object-fill rounded-xl" />
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div className="absolute h-full bg-[#4acd8d]" style={{ width: `${calculateBarPercentage(Number(typedCampaign.target), Number(typedCampaign.amountCollected))}%`, maxWidth: '100%' }}>
            </div>
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap md:justify-between gap-[30px] justify-center">
          <CountBox title="Days Left" value={String(daysLeft(typedCampaign.deadline))} />
          <CountBox title={`Raised of ${formatEther(typedCampaign.target)}`} value={formatEther(typedCampaign.amountCollected)} />
          <CountBox title="Total Backers" value={String(typedCampaign.funders.length)} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] uppercase">Creator</h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img src="/donate.png" alt="user" className="w-[60%] h-[60%] object-contain" />
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] break-all">{typedCampaign.owner}</h4>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] uppercase">Story</h4>

            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">{typedCampaign.description}</p>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] uppercase">Donators</h4>

            <div className="mt-[20px] flex flex-col gap-4">
              {getDonations(typedCampaign.funders, typedCampaign.donations).length > 0 ? getDonations(typedCampaign.funders, typedCampaign.donations).map((item, index) => (
                <div key={`${item.donator}}-${index}`} className="flex justify-between items-center gap-4">
                  <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll">{index + 1}. {item.donator}</p>
                  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-ll">{item.donation}</p>
                </div>
              )) : (
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">No donators yet. Be the first one!</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-epilogue font-semibold text-[18px] uppercase">Fund</h4>

          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
              Fund the campaign
            </p>
            <div className="mt-[30px]">
              <form ref={formRef} onSubmit={submit}>
                <input
                  type="number"
                  placeholder="ETH 0.1"
                  step="0.01"
                  className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                  name="value"
                  required
                />

                <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                  <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">Back it because you believe in it.</h4>
                  <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">Support the project for no reward, just because it speaks to you.</p>
                </div>

                <Button
                  type="submit"
                  disabled={writePending || isConfirming}
                  className="w-full bg-[#8c6dfd] cursor-pointer"
                >{writePending || isConfirming ? 'Funding...' : 'Fund Campaign'}</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CampaignDetail