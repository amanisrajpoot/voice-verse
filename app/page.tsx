import Recorder from "./components/Recorder";
import Timeline from "./components/Timeline";

export default function Home() {
  return (
    <div className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl p-6 rounded-3xl shadow-2xl backdrop-blur-md bg-white/10 border border-white/20 animate-fadeIn">
      <h1 className="text-3xl font-bold text-center mb-6">EchoVerse</h1>
      <p className="text-center text-white/70 mb-8">Tap to Start Recording</p>
      <Recorder />
      {/* If you want Timeline visible */}
      {/* <Timeline /> */}
    </div>
  );
}
