import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface ClientCampaign {
    owner: string;
    title: string;
    description: string;
    target: string;
    deadline: number;
    amountCollected: string;
    image: string;
    funders: string[];
    donations: number[];
}


// Define the state shape for campaigns
interface CampaignState {
    campaigns: ClientCampaign[];
}

const initialState: CampaignState = {
    campaigns: [],
}


export const campaignSlice = createSlice({
    name: "campaigns",
    initialState,
    reducers: {
        setCampaigns: (state, action: PayloadAction<ClientCampaign[]>) => {
            state.campaigns = action.payload
        },
        addCampaign: (state, action: PayloadAction<ClientCampaign>) => {
            state.campaigns.push(action.payload)
        }
    }
})

export const { setCampaigns, addCampaign } = campaignSlice.actions
export default campaignSlice.reducer