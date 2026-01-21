// src/components/shared/SearchAutocomplete.jsx
import { useState, useEffect, useRef, useMemo } from 'react';
import { Search, TrendingUp, Clock, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { products } from '../../data/products';
import ImageWithSkeleton from './ImageWithSkeleton';

// Typo tolerance and synonym support
const synonyms = {
  'phone': ['smartphone', 'mobile', 'cell'],
  'laptop': ['notebook', 'computer'],
  'shoes': ['sneakers', 'footwear'],
  'tshirt': ['t-shirt', 'shirt', 'tee'],
  'watch': ['timepiece', 'wristwatch'],
};

const getRecentSearches = () => {
  const recent = localStorage.getItem('recentSearches');
  return recent ? JSON.parse(recent) : [];
};

const saveRecentSearch = (query) => {
  const recent = getRecentSearches();
  const updated = [query, ...recent.filter(q => q !== query)].slice(0, 5);
  localStorage.setItem('recentSearches', JSON.stringify(updated));
};

const clearRecentSearches = () => {
  localStorage.setItem('recentSearches', JSON.stringify([]));
};

// Levenshtein distance for typo tolerance (module-level helper)
const levenshteinDistance = (str1, str2) => {
  const matrix = [];
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[str2.length][str1.length];
};

// Search with typo tolerance and synonyms (module-level)
const searchProducts = (searchQuery) => {
  if (!searchQuery.trim()) return [];

  const lowerQuery = searchQuery.toLowerCase();
  const words = lowerQuery.split(' ');
  
  // Expand query with synonyms
  const expandedWords = words.flatMap(word => {
    const syns = Object.entries(synonyms).find(([key, values]) => 
      key === word || values.includes(word)
    );
    return syns ? [word, ...syns[1]] : [word];
  });

  const results = products.filter(product => {
    const productText = `${product.name} ${product.description} ${product.tags.join(' ')}`.toLowerCase();
    
    // Exact match
    if (productText.includes(lowerQuery)) return true;

    // Typo tolerance (max 2 character difference)
    for (const word of expandedWords) {
      const productWords = productText.split(' ');
      for (const pWord of productWords) {
        if (pWord.length > 3 && levenshteinDistance(word, pWord) <= 2) {
          return true;
        }
      }
    }

    return false;
  });

  return results.slice(0, 5);
};

export default function SearchAutocomplete({ className = '' }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
   
const suggestions = useMemo(() => query.trim() ? searchProducts(query) : [], [query]);
  const [recentSearches, setRecentSearches] = useState(getRecentSearches());
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);




  const handleSearch = (searchQuery) => {
    if (searchQuery.trim()) {
      saveRecentSearch(searchQuery);
      setRecentSearches(getRecentSearches());
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setQuery('');
      setIsOpen(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(query);
  };

  const handleSuggestionClick = (product) => {
    navigate(`/products/${product.slug}`);
    setQuery('');
    setIsOpen(false);
  };

  const handleRecentClick = (recentQuery) => {
    setQuery(recentQuery);
    handleSearch(recentQuery);
  };

  const handleClearRecent = (e) => {
    e.stopPropagation();
    clearRecentSearches();
    setRecentSearches([]);
  };

  // Popular searches (mock data)
  const popularSearches = ['headphones', 'watch', 'shoes', 'laptop'];

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-full bg-white/80 backdrop-blur focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded-full"
            >
              <X className="w-4 h-4 text-slate-400" />
            </button>
          )}
        </div>
      </form>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white/95 backdrop-blur rounded-2xl shadow-xl border border-slate-200 z-50 max-h-96 overflow-y-auto">
          {/* Product Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-2">
              <p className="text-xs font-semibold text-gray-500 uppercase px-3 py-2">
                Products
              </p>
              {suggestions.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleSuggestionClick(product)}
                  className="w-full flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl text-left"
                >
                  <ImageWithSkeleton
                    src={product.images[0]}
                    alt={product.name}
                    className="w-12 h-12 rounded bg-gray-100"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {product.name}
                    </p>
                    <p className="text-sm text-slate-600">${product.price}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Recent Searches */}
          {!query && recentSearches.length > 0 && (
            <div className="p-2 border-t border-slate-100">
              <div className="flex items-center justify-between px-3 py-2">
                <p className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Recent Searches
                </p>
                <button
                  onClick={handleClearRecent}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Clear
                </button>
              </div>
              {recentSearches.map((recent, index) => (
                <button
                  key={index}
                  onClick={() => handleRecentClick(recent)}
                  className="w-full flex items-center gap-2 p-2 hover:bg-slate-50 rounded-xl text-left"
                >
                  <Search className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-700">{recent}</span>
                </button>
              ))}
            </div>
          )}

          {/* Popular Searches */}
          {!query && (
            <div className="p-2 border-t border-slate-100">
              <p className="text-xs font-semibold text-gray-500 uppercase px-3 py-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Popular Searches
              </p>
              {popularSearches.map((popular, index) => (
                <button
                  key={index}
                  onClick={() => handleRecentClick(popular)}
                  className="w-full flex items-center gap-2 p-2 hover:bg-slate-50 rounded-xl text-left"
                >
                  <TrendingUp className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-700">{popular}</span>
                </button>
              ))}
            </div>
          )}

          {/* No Results */}
          {query && suggestions.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              <p className="text-sm">No products found for "{query}"</p>
              <p className="text-xs mt-1">Try different keywords</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
