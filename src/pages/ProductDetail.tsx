import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { ArrowLeft, Heart, ShoppingCart, MapPin, Shield, Star, Truck, CreditCard, Globe, Award } from 'lucide-react';
import { motion } from "framer-motion";

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedSeller, setSelectedSeller] = useState<any>(null);
  const [showSellers, setShowSellers] = useState(false);

  // Mock product data - in real app, fetch by ID
  const product = {
    id: 1,
    name: "Nike Air Jordan 1 Retro High OG 'Chicago'",
    brand: "Nike",
    model: "Air Jordan 1",
    colorway: "Chicago",
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&h=400&fit=crop"
    ],
    description: "The iconic Air Jordan 1 in the legendary Chicago colorway. This timeless sneaker features premium leather construction and the classic red, white, and black color scheme that started it all.",
    retailPrice: 170,
    releaseDate: "1985-04-01",
    sku: "555088-101",
    category: "Basketball Shoes",
    sizes: ["US 7", "US 7.5", "US 8", "US 8.5", "US 9", "US 9.5", "US 10", "US 10.5", "US 11", "US 11.5", "US 12"],
    features: ["Premium Leather", "Air Cushioning", "Rubber Outsole", "Classic High-Top Design"]
  };

  // Mock sellers data based on size selection
  const getSellersBySize = (size: string) => [
    {
      id: 1,
      name: "StockX",
      location: "Detroit, USA",
      country: "🇺🇸",
      rating: 4.9,
      reviews: 2847,
      price: 450,
      originalPrice: 500,
      condition: "New",
      verified: true,
      fastShipping: true,
      authenticityGuarantee: true,
      shippingTime: "3-5 days",
      shippingCost: 15,
      totalStock: 12,
      sellerBadges: ["Top Seller", "Fast Ship", "Authentic"]
    },
    {
      id: 2,
      name: "GOAT",
      location: "Los Angeles, USA",
      country: "🇺🇸",
      rating: 4.8,
      reviews: 1923,
      price: 425,
      originalPrice: 475,
      condition: "New",
      verified: true,
      fastShipping: true,
      authenticityGuarantee: true,
      shippingTime: "2-4 days",
      shippingCost: 20,
      totalStock: 8,
      sellerBadges: ["Verified", "Premium"]
    },
    {
      id: 3,
      name: "Flight Club",
      location: "New York, USA",
      country: "🇺🇸",
      rating: 4.7,
      reviews: 3456,
      price: 480,
      originalPrice: 520,
      condition: "New",
      verified: true,
      fastShipping: false,
      authenticityGuarantee: true,
      shippingTime: "5-7 days",
      shippingCost: 12,
      totalStock: 5,
      sellerBadges: ["Established", "Authentic"]
    },
    {
      id: 4,
      name: "Sole Supremacy",
      location: "London, UK",
      country: "🇬🇧",
      rating: 4.6,
      reviews: 891,
      price: 395,
      originalPrice: 440,
      condition: "New",
      verified: true,
      fastShipping: true,
      authenticityGuarantee: true,
      shippingTime: "4-6 days",
      shippingCost: 25,
      totalStock: 15,
      sellerBadges: ["International", "Verified"]
    },
    {
      id: 5,
      name: "Sneaker District",
      location: "Amsterdam, Netherlands",
      country: "🇳🇱",
      rating: 4.8,
      reviews: 1247,
      price: 410,
      originalPrice: 450,
      condition: "New",
      verified: true,
      fastShipping: true,
      authenticityGuarantee: true,
      shippingTime: "3-5 days",
      shippingCost: 18,
      totalStock: 9,
      sellerBadges: ["European", "Fast Ship"]
    },
    {
      id: 6,
      name: "Kicks Crew",
      location: "Hong Kong",
      country: "🇭🇰",
      rating: 4.5,
      reviews: 2156,
      price: 385,
      originalPrice: 425,
      condition: "New",
      verified: true,
      fastShipping: false,
      authenticityGuarantee: true,
      shippingTime: "7-10 days",
      shippingCost: 30,
      totalStock: 22,
      sellerBadges: ["Asian Market", "Bulk Stock"]
    }
  ];

  const [sellers, setSellers] = useState<any[]>([]);

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    const availableSellers = getSellersBySize(size);
    setSellers(availableSellers);
    setShowSellers(true);
    toast.success(`Found ${availableSellers.length} verified sellers for size ${size}`);
  };

  const handlePurchase = (seller: any) => {
    setSelectedSeller(seller);
    toast.success(`Redirecting to ${seller.name} for secure checkout...`);
  };

  const lowestPrice = sellers.length > 0 ? Math.min(...sellers.map(s => s.price)) : 0;
  const highestPrice = sellers.length > 0 ? Math.max(...sellers.map(s => s.price)) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 border-b border-white/10">
        <div className="flex justify-between items-center">
          <Link to="/marketplace" className="flex items-center space-x-2 text-white hover:text-blue-300 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Marketplace</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Heart className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-96 object-cover"
              />
            </Card>
            
            <div className="grid grid-cols-3 gap-4">
              {product.images.slice(0, 3).map((img, index) => (
                <Card key={index} className="bg-white/5 backdrop-blur-xl border-white/10 overflow-hidden cursor-pointer hover:scale-105 transition-transform">
                  <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-24 object-cover" />
                </Card>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className="bg-blue-600 hover:bg-blue-700 mb-3">{product.brand}</Badge>
              <h1 className="text-4xl font-bold text-white mb-2">{product.name}</h1>
              <p className="text-gray-300 text-lg">{product.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
              <div>
                <span className="text-gray-400 text-sm">Retail Price</span>
                <p className="text-white font-semibold">${product.retailPrice}</p>
              </div>
              <div>
                <span className="text-gray-400 text-sm">SKU</span>
                <p className="text-white font-semibold">{product.sku}</p>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Release Date</span>
                <p className="text-white font-semibold">{new Date(product.releaseDate).getFullYear()}</p>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Category</span>
                <p className="text-white font-semibold">{product.category}</p>
              </div>
            </div>

            {/* Size Selection */}
            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Select Size</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-3">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      className={`${
                        selectedSize === size 
                          ? "bg-blue-600 hover:bg-blue-700" 
                          : "border-white/20 text-white hover:bg-white/10"
                      }`}
                      onClick={() => handleSizeSelect(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Product Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-600/20 text-blue-300">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Global Sellers Section */}
        {showSellers && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12"
          >
            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardHeader className="border-b border-white/10">
                <CardTitle className="text-white text-2xl flex items-center space-x-3">
                  <Globe className="w-6 h-6 text-blue-400" />
                  <span>Global Verified Sellers - Size {selectedSize}</span>
                </CardTitle>
                <div className="flex items-center space-x-4 text-gray-300">
                  <span>{sellers.length} sellers available</span>
                  {sellers.length > 0 && (
                    <>
                      <Separator orientation="vertical" className="h-4" />
                      <span>Price range: ${lowestPrice} - ${highestPrice}</span>
                    </>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  {sellers.map((seller) => (
                    <Card key={seller.id} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all">
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
                          {/* Seller Info */}
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl">{seller.country}</span>
                              <h3 className="text-white font-bold text-lg">{seller.name}</h3>
                              {seller.verified && (
                                <Shield className="w-5 h-5 text-green-400" />
                              )}
                            </div>
                            
                            <div className="flex items-center space-x-2 text-gray-300">
                              <MapPin className="w-4 h-4" />
                              <span className="text-sm">{seller.location}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-white font-medium">{seller.rating}</span>
                              </div>
                              <span className="text-gray-400 text-sm">({seller.reviews} reviews)</span>
                            </div>

                            <div className="flex flex-wrap gap-1">
                              {seller.sellerBadges.map((badge: string, index: number) => (
                                <Badge key={index} className="bg-green-600/20 text-green-300 text-xs">
                                  {badge}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Price & Condition */}
                          <div className="space-y-2">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl font-bold text-white">${seller.price}</span>
                              {seller.originalPrice > seller.price && (
                                <span className="text-gray-400 line-through text-lg">${seller.originalPrice}</span>
                              )}
                            </div>
                            <Badge className="bg-blue-600/20 text-blue-300">{seller.condition}</Badge>
                            <p className="text-gray-300 text-sm">{seller.totalStock} in stock</p>
                          </div>

                          {/* Shipping Info */}
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Truck className="w-4 h-4 text-blue-400" />
                              <span className="text-white text-sm">{seller.shippingTime}</span>
                              {seller.fastShipping && (
                                <Badge className="bg-orange-600/20 text-orange-300 text-xs">Fast</Badge>
                              )}
                            </div>
                            <p className="text-gray-300 text-sm">Shipping: ${seller.shippingCost}</p>
                            {seller.authenticityGuarantee && (
                              <div className="flex items-center space-x-2">
                                <Award className="w-4 h-4 text-green-400" />
                                <span className="text-green-300 text-sm">Authenticity Guaranteed</span>
                              </div>
                            )}
                          </div>

                          {/* Action */}
                          <div className="space-y-3">
                            <div className="text-right">
                              <p className="text-gray-300 text-sm">Total: ${seller.price + seller.shippingCost}</p>
                            </div>
                            <Button 
                              onClick={() => handlePurchase(seller)}
                              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                            >
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Buy Now
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
