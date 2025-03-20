import { formatEther } from "viem";

export function daysLeft(deadline: bigint) {
    const difference = new Date(Number(deadline) * 1000).getTime() - Date.now();
    const remainingDays = difference / (1000 * 3600 * 24);
    return remainingDays.toFixed(0);
};

export function getDonations (funders: string[], donations: bigint[]) {
    const parsedDonations = [];

    for(let i = 0; i < funders.length; i++) {
      parsedDonations.push({
        donator: funders[i],
        donation: formatEther(donations[i])
      })
    }

    return parsedDonations;
}
