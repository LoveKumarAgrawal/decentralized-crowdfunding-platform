"use server"

export const createNewCampaign = async (formData: FormData) => {
    const description = formData.get("description") as string
    const title = formData.get("title") as string
    const goal = formData.get("goal") as string
    const deadline = formData.get("deadline") as string
    const url = formData.get("url") as string

    console.log(description, title, goal, deadline, url)
}