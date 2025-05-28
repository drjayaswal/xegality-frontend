import Footer from "@/components/consumer/common/footer";
import Header from "@/components/consumer/common/header";

export default function ConsumerLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
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

