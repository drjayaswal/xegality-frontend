import { Footer } from "@/components/footer"
import { GridPattern } from "@/components/ui/grid-pattern";
import { Header } from "@/components/header"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
        <Header />
        <main className=" max-w-[90rem] mx-auto">
        <GridPattern className=" fixed -z-10 bg-gradient-to-br from-white to-indigo-500/20" />
            {children}
        </main>
        <Footer />
    </>
  )
}
