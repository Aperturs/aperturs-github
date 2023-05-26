import ComplexNavbar from "./navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="w-full py-2 my-4">
          <ComplexNavbar />
        </div>
        {children}
      </body>
    </html>
  );
}
