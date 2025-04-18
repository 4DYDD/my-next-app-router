import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
  ),
  title: "Home - My Tokoku",
  description: "Website My Tokoku",
  authors: [
    {
      name: "Somwan",
      url: `http://localhost:3000`,
    },
  ],
  openGraph: {
    title: "Home - My Tokoku",
  },
};

export default function Home() {
  return (
    <main className={`flexcc h-[70vh] !justify-between relative w-full`}>
      <div className="animate-spin transcenter p-10 text-lg font-bold border-x-gray-300 border-b-gray-300 border-t-red-500 border-2 rounded-full shadow-lg shadow-gray-300">
        <span className="transcenter">P</span>
      </div>
    </main>
  );
}
