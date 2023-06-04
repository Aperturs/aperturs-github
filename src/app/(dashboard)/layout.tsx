import ComplexNavbar from "./navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <section>
        <div className="w-full py-2 my-4">
          <ComplexNavbar />
        </div>
        {children}
      </section>
  );
}
