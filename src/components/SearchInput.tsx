
import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SearchInputProps {
  onSearch: (query: string) => void;
}

export const SearchInput = ({ onSearch }: SearchInputProps) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      toast({
        title: "Please enter a query",
        description: "Your query cannot be empty",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      onSearch(query);
      toast({
        title: "Query received",
        description: "Searching for relevant APIs...",
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#6E59A5] to-[#9b87f5] rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative glass rounded-lg shadow-xl">
          <div className="flex items-center px-4">
            <Search className="w-5 h-5 text-white/70" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Describe your oracle needs..."
              className="w-full px-4 py-6 bg-transparent border-none focus:outline-none focus:ring-0 text-lg font-serif placeholder:text-white/40 text-white"
            />
            <button
              type="submit"
              disabled={loading}
              className="ml-2 px-6 py-2 bg-gradient-to-r from-[#6E59A5] to-[#9b87f5] text-white rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 font-serif"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Search"
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
