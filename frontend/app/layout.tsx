import "./globals.css";
import Link from "next/link";

export const metadata = { title: "Affiliate Dashboard" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
        <header className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
          <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-bold">
              Affiliate Dashboard
            </h1>
            <nav className="flex gap-4 text-sm">
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Dashboard
              </Link>
              <Link
                href="/postback"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Postback URL
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-6 py-6">{children}</main>
      </body>
    </html>
  );
}
