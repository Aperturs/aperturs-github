import Sidebar from "./sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
      <section>
        <div className="flex relative gap-6">
        <Sidebar />
        <div>
        {children}
        </div>
        </div>
        
      </section>
   
  );
}
