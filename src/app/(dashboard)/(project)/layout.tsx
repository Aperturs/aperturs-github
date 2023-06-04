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
        <div>
        {children}
        </div>
        </div>
        
      </section>
   
  );
}
