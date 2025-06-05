import { Footer } from "@/components/student/common/footer";
import Header from "@/components/student/common/header";

export default function LawyerLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main className="mx-auto bg-emerald-700/6">{children}</main>
      <Footer />
    </>
  );
}
