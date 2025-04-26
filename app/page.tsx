import Recorder from "./components/Recorder";
import Timeline from "./components/Timeline";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white py-10 px-4">
      <div className="w-full max-w-md mx-auto p-6 rounded-3xl shadow-2xl backdrop-blur-md bg-white/10 border border-white/20 animate-fadeIn">
        <h1 className="text-3xl font-bold text-center mb-6">EchoVerse</h1>
        <p className="text-center text-white/70 mb-8">Tap to Start Recording</p>
        <Recorder />
      </div>

      {/* Timeline comes below Recorder */}
      {/* <div className="w-full max-w-2xl mx-auto mt-10 p-6 rounded-3xl shadow-2xl backdrop-blur-md bg-white/10 border border-white/20 animate-fadeIn">
        <h2 className="text-2xl font-semibold mb-6 text-center">Your Recordings</h2>
        <Timeline />
      </div> */}
    </main>
  );
}
