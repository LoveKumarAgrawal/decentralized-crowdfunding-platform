"use client"
import { createNewCampaign } from '@/actions/campaign';
import FormField from '@/components/FormField';
import { Button } from '@/components/ui/button';
import { HandCoins } from 'lucide-react';
import React, { useState } from 'react'

const CreateCampaign = () => {
  const [isLoading, setIsLoading] = useState(false);


  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col sm:p-10 p-4">
      {isLoading && <div>Loading</div>}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Start a Campaign</h1>
      </div>

      <form action={createNewCampaign} className="w-full mt-[65px] flex flex-col gap-[30px]">
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
              className="bg-[#1dc071] text-xl p-5 font-bold cursor-pointer"
              variant="secondary"
              >
            Submit new campaign
            </Button>
          </div>
      </form>
    </div>
  )
}

export default CreateCampaign