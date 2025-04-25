export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to EchoVerse</h1>
      <p className="text-lg text-gray-600 mb-6">Record and revisit your voice timeline</p>
      <a href="/record" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Start Recording</a>
    </main>
  );
}
