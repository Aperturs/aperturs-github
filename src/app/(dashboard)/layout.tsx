import ComplexNavbar from "./navbar";

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;}) {
  return (
    <div>
      <div className="w-full py-2 my-4">
        <ComplexNavbar />
      </div>
      <div className="w-full flex justify-center">
        <div className="sm:max-w-screen-2xl w-[95%]">{children}
        {modal}
        </div>
      </div>
    </div>
  );
}
