export const metadata = {
  title: "La Curia — Studio",
  description: "Pannello di gestione contenuti",
};
 
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ height: "100vh" }}>
      {children}
    </div>
  );
}
 
