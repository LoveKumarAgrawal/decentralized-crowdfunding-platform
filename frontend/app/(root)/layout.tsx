import Navbar from "@/components/Navbar"

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="dark:bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] flex flex-col min-h-screen">
            <Navbar />
            {children}
        </div>
    )
}

export default layout;