import Navbar from "@/components/Navbar"

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col">
            <Navbar />
            {children}
        </div>
    )
}

export default layout;