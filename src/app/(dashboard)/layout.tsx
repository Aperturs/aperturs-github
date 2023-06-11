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
        <div className="w-full flex justify-center">
          <div className="sm:w-[80%] w-[95%]">
        {children}
        </div>
        </div>
      </section>
  );
}
