
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart, PackageSearch, ShoppingCart, Filter, Search, TrendingUp, Award, Shield } from 'lucide-react';
import { motion } from "framer-motion";
import LuxuryProductCard from "@/components/LuxuryProductCard";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface Seller {
  name: string;
  rating: number;
  location: string;
  verified: boolean;
}

interface LuxuryProduct {
  id: number;
  name: string;
  brand: string;
  prices: { seller: Seller; price: number; originalPrice?: number }[];
  image: string;
  category: string;
  condition: string;
  authenticity: 'verified' | 'pending' | 'guaranteed';
  rarity: 'common' | 'rare' | 'ultra-rare';
  year?: number;
}

const MarketPlace = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [condition, setCondition] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [products, setProducts] = useState<LuxuryProduct[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [sortBy, setSortBy] = useState('price-low');

  const categories = [
    { name: "Luxury Watches", value: "watches" },
    { name: "Designer Handbags", value: "handbags" },
    { name: "Fine Jewelry", value: "jewelry" },
    { name: "Luxury Cars", value: "cars" },
    { name: "Designer Shoes", value: "shoes" },
    { name: "Art & Collectibles", value: "art" }
  ];

  const brands = [
    { name: "Rolex", value: "rolex" },
    { name: "Chanel", value: "chanel" },
    { name: "Louis Vuitton", value: "louis-vuitton" },
    { name: "Hermès", value: "hermes" },
    { name: "Cartier", value: "cartier" },
    { name: "Patek Philippe", value: "patek-philippe" }
  ];

  const priceRanges = [
    { name: "Under $1,000", value: "0-1000" },
    { name: "$1,000 - $5,000", value: "1000-5000" },
    { name: "$5,000 - $25,000", value: "5000-25000" },
    { name: "$25,000 - $100,000", value: "25000-100000" },
    { name: "Over $100,000", value: "100000+" }
  ];

  const conditions = [
    { name: "Brand New", value: "new" },
    { name: "Like New", value: "like-new" },
    { name: "Excellent", value: "excellent" },
    { name: "Very Good", value: "very-good" },
    { name: "Good", value: "good" }
  ];

  // Enhanced luxury products data
  const luxuryProducts: LuxuryProduct[] = [
    {
      id: 1,
      name: "Submariner Date 41mm",
      brand: "Rolex",
      prices: [
        { 
          seller: { name: "Crown & Caliber", rating: 4.9, location: "Atlanta, GA", verified: true }, 
          price: 13500, 
          originalPrice: 14800 
        },
        { 
          seller: { name: "Bob's Watches", rating: 4.8, location: "Newport Beach, CA", verified: true }, 
          price: 13800 
        },
        { 
          seller: { name: "Tourneau", rating: 4.7, location: "New York, NY", verified: true }, 
          price: 14200 
        }
      ],
      image: "/images/rolex-submariner.webp",
      category: "watches",
      condition: "Excellent",
      authenticity: "verified",
      rarity: "rare",
      year: 2022
    },
    {
      id: 2,
      name: "Classic Flap Bag Medium",
      brand: "Chanel",
      prices: [
        { 
          seller: { name: "Fashionphile", rating: 4.9, location: "Beverly Hills, CA", verified: true }, 
          price: 8500 
        },
        { 
          seller: { name: "The RealReal", rating: 4.6, location: "San Francisco, CA", verified: true }, 
          price: 8800,
          originalPrice: 9200
        },
        { 
          seller: { name: "Vestiaire Collective", rating: 4.5, location: "London, UK", verified: false }, 
          price: 8200 
        }
      ],
      image: "/images/bag.webp",
      category: "handbags",
      condition: "Like New",
      authenticity: "guaranteed",
      rarity: "common"
    },
    {
      id: 3,
      name: "Phantom VIII",
      brand: "Rolls-Royce",
      prices: [
        { 
          seller: { name: "Barrett-Jackson", rating: 4.8, location: "Scottsdale, AZ", verified: true }, 
          price: 485000 
        },
        { 
          seller: { name: "RM Sotheby's", rating: 4.9, location: "Monaco", verified: true }, 
          price: 495000,
          originalPrice: 520000
        }
      ],
      image: "/images/rolls-royce.jpg",
      category: "cars",
      condition: "Excellent",
      authenticity: "verified",
      rarity: "ultra-rare",
      year: 2023
    },
    {
      id: 4,
      name: "Nautilus 5711/1A",
      brand: "Patek Philippe",
      prices: [
        { 
          seller: { name: "Antiquorum", rating: 4.8, location: "Geneva, Switzerland", verified: true }, 
          price: 125000 
        },
        { 
          seller: { name: "Christie's", rating: 4.9, location: "New York, NY", verified: true }, 
          price: 128000,
          originalPrice: 135000
        }
      ],
      image: "/images/patek-philippe.jpg",
      category: "watches",
      condition: "Brand New",
      authenticity: "guaranteed",
      rarity: "ultra-rare",
      year: 2021
    }
  ];

  const fetchRecommendations = async () => {
    setLoadingProducts(true);
    try {
      setTimeout(() => {
        let filteredProducts = [...luxuryProducts];
        
        // Apply filters
        if (selectedCategory) {
          filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
        }
        if (selectedBrand) {
          filteredProducts = filteredProducts.filter(p => p.brand.toLowerCase().replace(/\s+/g, '-') === selectedBrand);
        }
        if (searchQuery) {
          filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        // Apply sorting
        switch (sortBy) {
          case 'price-low':
            filteredProducts.sort((a, b) => Math.min(...a.prices.map(p => p.price)) - Math.min(...b.prices.map(p => p.price)));
            break;
          case 'price-high':
            filteredProducts.sort((a, b) => Math.min(...b.prices.map(p => p.price)) - Math.min(...a.prices.map(p => p.price)));
            break;
          case 'rarity':
            const rarityOrder = { 'ultra-rare': 3, 'rare': 2, 'common': 1 };
            filteredProducts.sort((a, b) => rarityOrder[b.rarity] - rarityOrder[a.rarity]);
            break;
        }

        setProducts(filteredProducts);
        setShowRecommendations(true);
        toast.success(`Found ${filteredProducts.length} luxury items with price comparison!`);
      }, 2000);
    } catch (error) {
      toast.error("Failed to fetch luxury products.");
      console.error("❌ Error fetching products", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleAddToFavorites = async (product: LuxuryProduct) => {
    try {
      // Simulate API call
      toast.success(`${product.name} added to favorites!`);
    } catch (error) {
      toast.error('Error adding to favorites');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <header className="relative container mx-auto px-4 py-6 flex justify-between items-center border-b border-blue-300/20 backdrop-blur-sm">
        <Link to="/" className="flex items-center space-x-2 text-white hover:text-blue-300 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Home</span>
        </Link>

        <div className="flex items-center space-x-6">
          <Link
            to="/favorites"
            className="flex items-center space-x-2 text-white hover:text-blue-300 transition font-semibold"
          >
            <Heart className="w-5 h-5" />
            <span>Favorites</span>
          </Link>
          <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1">
            <Shield className="w-3 h-3 mr-1" />
            Verified Platform
          </Badge>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-16 text-center">
        <motion.div 
          initial={{ y: -50, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 1 }}
          className="space-y-6"
        >
          <div className="flex justify-center items-center space-x-4 mb-8">
            <ShoppingCart className="w-20 h-20 text-blue-400" />
            <Award className="w-16 h-16 text-gold-400" />
          </div>
          
          <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 mb-4">
            LUXE MARKETPLACE
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
            Global luxury reselling platform with verified authenticity & real-time price comparison from premium dealers worldwide
          </p>
          
          <div className="flex justify-center items-center space-x-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">500K+</div>
              <div className="text-blue-300 text-sm">Authenticated Items</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">1000+</div>
              <div className="text-blue-300 text-sm">Verified Dealers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">50+</div>
              <div className="text-blue-300 text-sm">Countries</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Search and Filter Section */}
      <section className="relative container mx-auto px-4 pb-12">
        <Card className="max-w-6xl mx-auto bg-gradient-to-br from-slate-800/80 to-blue-900/80 backdrop-blur-xl border border-blue-300/20">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
              Find Your Perfect Luxury Item
            </CardTitle>
            <p className="text-blue-200">Advanced search with price comparison across global dealers</p>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
              <Input
                placeholder="Search luxury items, brands, or models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-blue-300/30 text-white placeholder-blue-300/70 text-lg py-6"
              />
            </div>

            {/* Advanced Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label className="text-blue-200 font-medium flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Category
                </Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="bg-white/10 border-blue-300/30 text-white">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-blue-200 font-medium">Brand</Label>
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger className="bg-white/10 border-blue-300/30 text-white">
                    <SelectValue placeholder="All Brands" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map(brand => (
                      <SelectItem key={brand.value} value={brand.value}>{brand.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-blue-200 font-medium">Price Range</Label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="bg-white/10 border-blue-300/30 text-white">
                    <SelectValue placeholder="Any Price" />
                  </SelectTrigger>
                  <SelectContent>
                    {priceRanges.map(range => (
                      <SelectItem key={range.value} value={range.value}>{range.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-blue-200 font-medium">Condition</Label>
                <Select value={condition} onValueChange={setCondition}>
                  <SelectTrigger className="bg-white/10 border-blue-300/30 text-white">
                    <SelectValue placeholder="Any Condition" />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map(cond => (
                      <SelectItem key={cond.value} value={cond.value}>{cond.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Sort and Search Button */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <Label className="text-blue-200 font-medium">Sort by:</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 bg-white/10 border-blue-300/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rarity">Rarity</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={fetchRecommendations}
                disabled={loadingProducts}
                className="flex-1 sm:flex-none bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white py-6 px-8 text-lg font-semibold shadow-2xl"
              >
                {loadingProducts ? (
                  <div className="flex items-center space-x-2 justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Searching Global Market...</span>
                  </div>
                ) : (
                  <>
                    <PackageSearch className="w-5 h-5 mr-2" />
                    Compare Prices & Find Best Deals
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Products Display */}
      {showRecommendations && (
        <section className="relative container mx-auto px-4 pb-20">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white">
                Luxury Items Found ({products.length})
              </h2>
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2">
                Price comparison across {products.reduce((acc, p) => acc + p.prices.length, 0)} dealers
              </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <LuxuryProductCard 
                    product={product}
                    onAddToFavorites={handleAddToFavorites}
                  />
                </motion.div>
              ))}
            </div>

            {products.length === 0 && (
              <div className="text-center py-20">
                <PackageSearch className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">No items found</h3>
                <p className="text-blue-200">Try adjusting your search criteria</p>
              </div>
            )}
          </motion.div>
        </section>
      )}
    </div>
  );
};

export default MarketPlace;
