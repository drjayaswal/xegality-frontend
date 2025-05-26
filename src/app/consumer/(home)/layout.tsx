
export default function ConsumerLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <>
      <main className="mx-auto">
        {children}
      </main>
    </>
  )
}

