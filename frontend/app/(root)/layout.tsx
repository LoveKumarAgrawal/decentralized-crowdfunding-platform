import Navbar from "@/components/Navbar"

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col min-h-screen dark:bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e]">
            <Navbar />
            <main className="flex-1 flex justify-center items-center w-full">
                {children}
            </main>
        </div>
    )
}

export default layout;