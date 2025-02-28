
import { useState } from "react";
import { SearchInput } from "@/components/SearchInput";
import confetti from 'canvas-confetti';
import { getNodeAnswer } from "@/lib/nodes";

type Stage = 'initial' | 'selecting' | 'complete';

const Index = () => {
  const [stage, setStage] = useState<Stage>('initial');
  const [savedQuery, setSavedQuery] = useState<string>('');
  const [nodeAnswer, setNodeAnswer] = useState<string>('');

  const handleSearch = async (query: string) => {
    setSavedQuery(query);
    setStage('selecting');
    const answer = await getNodeAnswer(query);
    setNodeAnswer(answer);
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
      <div 
        className={`fixed transition-all duration-700 ease-in-out
          ${stage === 'initial' ? 'hidden' : 
            stage === 'selecting' ? 'right-48' : 'right-[30vw]'}
          `}
      >
        <div className={`w-32 h-32 rounded-full bg-gradient-to-r from-[#6E59A5] to-[#9b87f5] 
          ${stage === 'initial' ? 'animate-bounce' : 
            stage === 'selecting' ? 'animate-spin' : 'animate-pulse'} 
          transition-all duration-500`} />
      </div>
      
      <div className={`transition-all duration-700 ease-in-out w-full
        ${stage === 'initial' ? '' : stage === 'selecting' ? 'pl-24 pr-64' : ''}`}>
        <div className={stage === 'initial' ? '' : 'hidden'}>
          <div className={`text-center mb-6 animate-fade-in 
            ${stage === 'selecting' ? 'text-left' : ''}`}>
            <div className="inline-block mb-4 px-4 py-1 rounded-full glass scale-90">
              <p className="text-white/80 text-sm font-medium font-serif">
                Powered by Othentic & EigenLayer
              </p>
            </div>
            <p className="text-xl text-white/80 max-w-4xl mx-auto font-serif">
              What question would you like answered?
            </p>
          </div>
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          {stage === 'initial' && <SearchInput onSearch={handleSearch} />}
          {stage === 'selecting' && (
            <div className="max-w-3xl glass p-8 rounded-lg text-center">
              <h2 className="text-2xl font-serif mb-4 text-white">Query Received!</h2>
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full border-4 border-[#9b87f5] border-t-transparent animate-spin"></div>
              </div>
              <p className="text-lg text-white/80 font-serif mb-2">
                Our network is validating the node's answer:"
              </p>
              <p className="text-sm text-white/60 font-serif">
                "{nodeAnswer}"
              </p>
              <div className="mt-8 flex justify-center space-x-2">
                <div className="w-2 h-2 bg-[#6E59A5] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#8270c0] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 bg-[#9b87f5] rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          )}

          {stage === 'complete' && (
            <div className="text-center animate-fade-in pr-[20vw]">
              <h2 className="text-3xl font-serif text-white mb-4">
                Oracle Deployed Successfully!
              </h2>
              <p className="text-lg text-white/70 font-serif">
                Your oracle is now live on the network
              </p>
            </div>
          )}
        </div>
        <div className={stage === 'initial' ? '' : 'hidden'}>
          <div className="mt-8 text-center animate-fade-in opacity-40" style={{ animationDelay: "0.4s" }}>
            <p className="text-sm text-white/60 font-serif">
              Your gateway to decentralized data infrastructure
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
