"use client"
import Image from "next/image"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

const Hero = () => {
    const router = useRouter()
    return (
        <section className="py-20 px-6 lg:px-24">
            <div className="flex flex-col-reverse lg:flex-row justify-between gap-16">
                
                {/* Text Content */}
                <div className="space-y-6">
                    <h1 className="text-4xl lg:text-7xl font-mono lg:leading-20 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-900 py-3">
                        <span>Crowdfunding</span> <br className="hidden lg:block" />
                        <span>with Crypto</span>
                    </h1>

                    <p className="text-lg lg:text-xl font-mono">
                        Raise and contribute funds using a decentralized platform powered by blockchain technology.
                    </p>

                    <Button
                        className="rounded-full px-8 py-7 text-white text-base bg-gradient-to-r from-[#4e3fd5] to-[#050564] hover:opacity-70 transition cursor-pointer"
                        onClick={() => router.push('/all-campaigns')}
                    >
                        Explore Campaigns
                    </Button>
                </div>

                {/* Image Section */}
                <div className="lg:flex lg:justify-center hidden">
                    <Image
                        src="/ethereum_icon.png"
                        width={450}
                        height={450}
                        alt="Ethereum Icon"
                        className="object-contain"
                        priority
                    />
                </div>
            </div>
        </section>
    )
}

export default Hero
