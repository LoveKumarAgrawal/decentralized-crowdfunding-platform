"use client"
import FormField from '@/components/FormField';
import { Button } from '@/components/ui/button';
import { HandCoins } from 'lucide-react';
import React, { FormEvent, useEffect } from 'react'
import { useAccount, useWriteContract } from 'wagmi';
import { abi } from '@/lib/abi';
import { parseEther } from 'viem'

const CreateCampaign = () => {
  const { address } = useAccount()
  const { 
    data: hash, 
    isPending,
    writeContract 
  } = useWriteContract() 

  function createNewCampaign(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const description = formData.get("description") as string
    const title = formData.get("title") as string
    const goal = formData.get("goal") as string
    const deadline = formData.get("deadline") as string
    const url = formData.get("url") as string

     // Convert deadline to Unix timestamp (uint256)
    const deadlineTimestamp = new Date(deadline).getTime() / 1000; // in seconds

    writeContract({
      address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
      abi,
      functionName: 'createCampaign',
      args: [address, title, description, parseEther(goal), deadlineTimestamp, url],
    })
  }

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col sm:p-10 p-4">
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Start a Campaign</h1>
      </div>

      <form onSubmit={createNewCampaign} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField 
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            name="title"
          />
        </div>

        <FormField 
            labelName="Story *"
            placeholder="Write your story"
            isTextArea
            name="description"
          />

        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <HandCoins className="w-[40px] h-[40px] object-contain" />
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">You will get 100% of the raised amount</h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField 
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            name="goal"
          />
          <FormField 
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            name="deadline"
          />
        </div>

        <FormField
            labelName="Campaign image *"
            placeholder="Place image URL of your campaign"
            inputType="url"
            name="url"
          />

          <div className="flex justify-center items-center mt-[30px]">
            <Button
              type="submit"
              disabled={isPending}
              className="bg-[#1dc071] text-xl p-5 font-bold cursor-pointer"
              variant="secondary"
              >
                {isPending ? 'Creating...' : 'Submit new campaign'}
            </Button>
          </div>
      </form>
    </div>

  )
}

export default CreateCampaign