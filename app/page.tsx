import Recorder from "./components/Recorder";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 to-blue-900 text-white">
      <div className="w-full max-w-md mx-auto p-6 rounded-3xl shadow-2xl backdrop-blur-md bg-white/10 border border-white/20 animate-fadeIn">
        <h1 className="text-3xl font-bold text-center mb-6 text-cyan-300">EchoVerse</h1>
        <Recorder />
        <div className="text-center mt-8">
          <a href="/entries" className="text-pink-400 hover:underline font-medium">
            View Your Timeline
          </a>
        </div>
      </div>
    </main>
  );
}
