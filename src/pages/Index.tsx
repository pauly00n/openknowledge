
import { SearchInput } from "@/components/SearchInput";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center mb-12 animate-fade-in">
        <div className="inline-block mb-4 px-4 py-1 rounded-full bg-white/50 backdrop-blur-sm border border-purple-100">
          <p className="text-sm text-purple-700 font-medium">
            Powered by Phala Network & EigenLayer
          </p>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Oracle Deployment Assistant
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Deploy blockchain oracles effortlessly using natural language. Simply describe
          your needs, and we'll handle the rest.
        </p>
      </div>

      <div className="w-full animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <SearchInput />
      </div>

      <div className="mt-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
        <p className="text-sm text-gray-500">
          Your gateway to decentralized data infrastructure
        </p>
      </div>
    </div>
  );
};

export default Index;
