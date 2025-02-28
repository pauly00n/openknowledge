import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-background/80 animate-fade-in" style={{ animationDuration: "0.8s" }}>
      <div className="text-center space-y-6 px-4">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white">
          OpenKnowledge
        </h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto font-serif">
          Decentralized AI Infrastructure powered by EigenLayer and Othentic
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link to="/oracle">
            <Button size="lg" className="bg-gradient-to-r from-[#6E59A5] to-[#9b87f5] text-white font-serif">
              Launch Network
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
