import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"
import Navbar from "@/app/components/Navbar"

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth()

    if (!session) {
        redirect("/login")
    }

    const handleSignOut = async () => {
        "use server"
        await signOut({ redirectTo: "/login" })
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar session={session} signOutAction={handleSignOut} />
            <main className="pt-16">
                {children}
            </main>
        </div>
    )
}
