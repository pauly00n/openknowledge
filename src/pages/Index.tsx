
import { useState } from "react";
import { SearchInput } from "@/components/SearchInput";
import Globe from "@/components/Globe";
import confetti from 'canvas-confetti';

type Stage = 'initial' | 'selecting' | 'complete';

const Index = () => {
  const [stage, setStage] = useState<Stage>('initial');

  const handleSearch = () => {
    setStage('selecting');
  };

  const handleComplete = () => {
    setStage('complete');
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <Globe stage={stage} />
      
      <div className="text-center mb-12 animate-fade-in">
        <div className="inline-block mb-4 px-4 py-1 rounded-full bg-white/50 backdrop-blur-sm border border-purple-100">
          <p className="text-sm text-purple-700 font-medium font-serif">
            Powered by Phala Network & EigenLayer
          </p>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif bg-gradient-to-r from-[#403E43] to-[#6E59A5] bg-clip-text text-transparent">
          Oracle Deployment Assistant
        </h1>
        <p className="text-lg text-[#403E43] max-w-2xl mx-auto font-serif">
          Deploy blockchain oracles effortlessly using natural language. Simply describe
          your needs, and we'll handle the rest.
        </p>
      </div>

      <div className="w-full animate-fade-in" style={{ animationDelay: "0.2s" }}>
        {stage === 'initial' && <SearchInput onSearch={handleSearch} />}
        
        {stage === 'selecting' && (
          <div className="max-w-3xl mx-auto glass p-6 rounded-lg">
            <h2 className="text-2xl font-serif mb-4 text-white">Select APIs</h2>
            <div className="space-y-4">
              {/* Example API options */}
              <div className="p-4 glass rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                <h3 className="text-lg font-serif text-white">Price Feed API</h3>
                <p className="text-sm text-gray-300">Real-time cryptocurrency price data</p>
              </div>
              <div className="p-4 glass rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                <h3 className="text-lg font-serif text-white">Weather Data API</h3>
                <p className="text-sm text-gray-300">Global weather information</p>
              </div>
              <button
                onClick={handleComplete}
                className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-[#6E59A5] to-[#9b87f5] text-white rounded-md hover:opacity-90 transition-opacity font-serif"
              >
                Deploy Oracle
              </button>
            </div>
          </div>
        )}

        {stage === 'complete' && (
          <div className="text-center animate-fade-in">
            <h2 className="text-3xl font-serif text-white mb-4">
              Oracle Deployed Successfully!
            </h2>
            <p className="text-lg text-gray-300 font-serif">
              Your oracle is now live on the network
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
        <p className="text-sm text-[#8E9196] font-serif">
          Your gateway to decentralized data infrastructure
        </p>
      </div>
    </div>
  );
};

export default Index;
