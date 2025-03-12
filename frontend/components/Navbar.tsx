"use client"
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { useAccount, useConnect, useConnectors, useDisconnect } from 'wagmi';
import { Power } from 'lucide-react';

function Navbar() {

  const connectors = useConnectors()
  const { connect } = useConnect()
  const { address } = useAccount()
  const { disconnect } = useDisconnect()

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only render the address or connect wallet button after client-side hydration
  if (!isClient) {
    return null; // Prevents SSR mismatch by not rendering the component during SSR
  }

  return (
    <nav className="p-4 shadow-md bg-gray-900 text-white">
      <div className="flex md:flex-row flex-col justify-between items-center">
        <Link href="/" className="text-xl font-bold mb-4 md:mb-0">
          Decentralized CrowdFunding
        </Link>
        <div className='flex gap-3 justify-between items-center'>
          <Button className="bg-slate-100 text-black cursor-pointer" variant='outline'>
            Create a Campaign
          </Button>
          {
            address ?
              <div className='flex gap-2 justify-center items-center'>
                <span className='border-1 px-3 py-1 rounded-2xl'>{address.slice(0, 6)}...</span>
                <Power onClick={() => disconnect()} className="cursor-pointer" />
              </div>
              : <Button className="bg-slate-100 text-black cursor-pointer" onClick={() => connect({ connector: connectors[0] })} variant='outline'>Connect Wallet</Button>
          }
        </div>
      </div>
    </nav>
  );
}

export default Navbar;