import "./globals.css";

export const metadata = { title: "Affiliate Dashboard" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 p-6">
        <nav className="mb-6">
          <h1 className="text-2xl font-bold">Affiliate Dashboard</h1>
        </nav>
        {children}
      </body>
    </html>
  );
}
