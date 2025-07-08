import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Cpu, ShoppingCart, Store, BarChart3, Rocket } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-pink-700 to-pink-500">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center">
          <motion.div
            className="flex items-center space-x-2"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-8 h-8 bg-pink-400 rounded-lg flex items-center justify-center">
              <Store className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">ADOGENT</span>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-8"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-600">
              Global Luxury
              <br />
              <span className="text-4xl text-pink-500">Zero Guesswork</span>
            </h1>

            <p className="text-xl text-pink-200 leading-relaxed">
              Our AI powered agents help pull prices from trusted sources around the globe, so you don’t have to. 
              Know exactly where the best price is in seconds.
            </p>

            <div className="space-y-4">
              <p className="text-pink-400 text-lg font-medium">
                Buy • Sell • Authenticate
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link to="/marketplace">
                    <Button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-xl text-lg">
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Marketplace →
                    </Button>
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link to="/ai-assistant">
                    <Button variant="outline" className="border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-white px-8 py-3 rounded-xl text-lg">
                      <Cpu className="w-5 h-5 mr-2" />
                      AI Assistant →
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              {[ 
                { label: "Accuracy", value: "99.5%", color: "text-pink-400" },
                { label: "Support", value: "24/7", color: "text-pink-500" },
                { label: "Deals Closed", value: "1000+", color: "text-pink-600" },
              ].map((item, i) => (
                <motion.div key={i} className="text-center" whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} transition={{ delay: i * 0.2 }}>
                  <div className={`text-3xl font-bold ${item.color}`}>{item.value}</div>
                  <div className="text-pink-300">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="relative">
            <div className="space-y-6">
              {[ 
                { Icon: Cpu, title: "AI Analysis", desc: "Explore a wide range of styles and choices tailored to your taste", gradient: "from-pink-500 via-pink-600 to-pink-700" },
                { Icon: Store, title: "Authenticated And Minted", desc: "Secure, genuine goods backed by blockchain-powered authentication", gradient: "from-pink-400 to-pink-600" },
                { Icon: BarChart3, title: "Data Driven", desc: "In-depth market insights to keep you ahead of fashion trends", gradient: "from-pink-600 to-pink-700" }
              ].map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card className={`bg-white/10 backdrop-blur-lg border-white/20 p-4 transform transition-transform duration-300`}>
                    <CardContent className="p-0">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center">
                          <card.Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{card.title}</h3>
                          <p className="text-pink-300 text-sm">{card.desc}</p>
                        </div>
                      </div>
                      <div className={`w-full bg-gradient-to-r ${card.gradient} h-2 rounded-full`}></div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <motion.section
        className="container mx-auto px-4 py-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-600 mb-4">
            Why Choose ADOGENT?
          </h2>
          <p className="text-pink-300 text-lg">
            Access exclusive fashion from the world’s finest sellers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[ 
            {
              icon: <Cpu className="w-8 h-8" />,
              title: "AI-Powered Analysis",
              description: "Smart recommendations based on market data",
              color: "from-pink-500 to-pink-600"
            },
            {
              icon: <BarChart3 className="w-8 h-8" />,
              title: "Data-Driven Insights",
              description: "Real-time analytics to make informed decisions",
              color: "from-pink-600 to-pink-700"
            },
            {
              icon: <Rocket className="w-8 h-8" />,
              title: "Automated Transactions",
              description: "AI agents that make the buying and selling easier",
              color: "from-pink-400 to-pink-600"
            },
            {
              icon: <Store className="w-8 h-8" />,
              title: "Verified Luxury Goods",
              description: "Authenticate and verify your products seamlessly",
              color: "from-pink-600 to-pink-700"
            }
          ].map((feature, index) => (
            <motion.div key={index} whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} transition={{ delay: index * 0.2 }}>
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-pink-300 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="container mx-auto px-4 py-20"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-12 text-center">
          <CardContent className="p-0">
            <h2 className="text-3xl font-bold text-white mb-4">Get Started Today</h2>
            <p className="text-pink-300 mb-8 max-w-2xl mx-auto">
              Revolutionizing the luxury e-commerce experience with AI-powered agents.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link to="/marketplace">
                  <Button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-xl text-lg">
                    Start Shopping
                  </Button>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }}>
                <Link to="/ai-assistant">
                  <Button variant="outline" className="border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-white px-8 py-3 rounded-xl text-lg">
                    Ask AI Assistant
                  </Button>
                </Link>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.section>
    </div>
  );
};

export default Index;
