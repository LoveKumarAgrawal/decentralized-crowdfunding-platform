"use client"
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { useAccount, useConnect, useConnectors, useDisconnect } from 'wagmi';
import { Power } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ModeToggle } from './ModeToggle';

function Navbar() {

  const connectors = useConnectors()
  const { connect } = useConnect()
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const router = useRouter()


  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only render the address or connect wallet button after client-side hydration
  if (!isClient) {
    return null; // Prevents SSR mismatch by not rendering the component during SSR
  }

  return (
    <nav className="p-4 shadow-md dark:bg-gray-800">
      <div className="flex md:flex-row flex-col justify-between items-center">
        <Link href="/" className="text-xl font-bold mb-4 md:mb-0 dark:text-gray-200">
          Decentralized CrowdFunding
        </Link>
        <div className="flex flex-col md:flex-row gap-3 justify-between items-center">
          <ModeToggle />
          {
            address && (
              <Button
            className="bg-green-400 dark:bg-green-500 cursor-pointer"
            variant="ghost"
            onClick={() => router.push('/create-campaign')}
          >
            Create a Campaign
          </Button>
            )
          }
          {address && (
            <Button
              className="bg-green-400 dark:bg-green-500 cursor-pointer"
              variant="ghost"
              onClick={() => router.push('/my-campaigns')}
            >
              My Campaigns
            </Button>
          )}
          {address ? (
            <div className="flex gap-2 justify-center items-center">
              <span className="border-1 px-3 py-1 rounded-2xl dark:border-slate-100 border-black">
                {address.slice(0, 6)}...
              </span>
              <Power onClick={() => disconnect()} className="cursor-pointer dark:text-gray-300" />
            </div>
          ) : (
            <Button
              className="bg-black text-white dark:bg-slate-100 dark:text-black cursor-pointer"
              onClick={() => connect({ connector: connectors[0] })}
              variant="outline"
            >
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;