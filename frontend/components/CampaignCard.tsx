import { Campaign } from "@/app/(root)/page";
import { daysLeft } from "@/lib";
import Image from "next/image";
import { formatEther } from "viem"

const CampaignCard = ({campaign, handleClick} : { campaign: Campaign; handleClick: (randomId: bigint) => void }) => {

  const { image, title, description, amountCollected, deadline, target, owner, randomId } = campaign

  return (
    <div className="sm:w-[288px] w-full rounded-[15px] dark:bg-black cursor-pointer border-8" onClick={() => handleClick(randomId)}>
      <img src={image} alt="fund" className="w-full h-[158px] object-cover rounded-[15px]" />

      <div className="flex flex-col p-4">
        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px] text-left leading-[26px] truncate">{title}</h3>
          <p className="mt-[5px] font-epilogue font-normal dark:text-[#808191] text-left leading-[18px] truncate">{description}</p>
        </div>

        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] dark:text-[#b2b3bd] leading-[22px]">{formatEther(amountCollected)}</h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] dark:text-[#808191] sm:max-w-[120px] truncate">Raised of {formatEther(target)}</p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] dark:text-[#b2b3bd] leading-[22px]">{daysLeft(deadline)}</h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] dark:text-[#808191] sm:max-w-[120px] truncate">Days Left</p>
          </div>
        </div>

        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            <Image src="/donate.png" alt="user" width={15} height={15} />
          </div>
          <p className="flex-1 font-epilogue font-normal text-[12px] dark:text-[#808191] truncate">by <span className="dark:text-[#b2b3bd]">{owner}</span></p>
        </div>
      </div>
    </div>
  )
}

export default CampaignCard