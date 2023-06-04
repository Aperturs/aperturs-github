import Sidebar from "./sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
      <section>
        <div className="lg:flex relative gap-8">
        <Sidebar />
        <div className="mt-8 lg:mt-1 w-full flex justify-center lg:block">
        {children}
        </div>
        </div>
        
      </section>
   
  );
}
