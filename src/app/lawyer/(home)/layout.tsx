import { Footer } from "@/components/lawyer/common/footer";
import { Header } from "@/components/lawyer/common/header";

export default function LawyerLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <>
      <Header />
      <main className="mx-auto">
        {children}
      </main>
      <Footer />
    </>
  )
}


