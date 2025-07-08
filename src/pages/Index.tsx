import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Cpu, ShoppingCart, Store, BarChart3, Rocket } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-teal-800">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center">
          <motion.div
            className="flex items-center space-x-3"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-10 h-10 bg-teal-400 rounded-lg flex items-center justify-center shadow-lg">
              <Store className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-extrabold text-white tracking-wide">ADOGENT</span>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="space-y-10 max-w-xl"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 leading-tight">
              Global Luxury
              <br />
              <span className="text-4xl text-blue-400 font-semibold">Zero Guesswork</span>
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed">
              Our AI powered agents help pull prices from trusted sources around the globe, so you don’t have to. 
              Know exactly where the best price is in seconds.
            </p>

            <div className="space-y-5">
              <p className="text-teal-400 text-lg font-semibold tracking-wide">
                Buy • Sell • Authenticate
              </p>

              <div className="flex flex-wrap gap-5">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link to="/marketplace">
                    <Button className="bg-teal-500 hover:bg-teal-600 text-white px-10 py-4 rounded-xl text-lg flex items-center gap-3">
                      <ShoppingCart className="w-6 h-6" />
                      Marketplace →
                    </Button>
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link to="/ai-assistant">
                    <Button variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-10 py-4 rounded-xl text-lg flex items-center gap-3">
                      <Cpu className="w-6 h-6" />
                      AI Assistant →
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-10 pt-12">
              {[ 
                { label: "Accuracy", value: "99.5%", color: "text-teal-400" },
                { label: "Support", value: "24/7", color: "text-blue-400" },
                { label: "Deals Closed", value: "1000+", color: "text-purple-400" },
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  className="text-center"
                  whileInView={{ opacity: 1, y: 0 }} 
                  initial={{ opacity: 0, y: 20 }} 
                  transition={{ delay: i * 0.3 }}
                >
                  <div className={`text-4xl font-extrabold ${item.color}`}>{item.value}</div>
                  <div className="text-gray-400 uppercase tracking-wider font-medium">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="relative max-w-md">
            <div className="space-y-8">
              {[ 
                { Icon: Cpu, title: "AI Analysis", desc: "Explore a wide range of styles and choices tailored to your taste", gradient: "from-purple-500 via-blue-500 to-teal-500" },
                { Icon: Store, title: "Authenticated And Minted", desc: "Secure, genuine goods backed by blockchain-powered authentication", gradient: "from-green-400 to-teal-500" },
                { Icon: BarChart3, title: "Data Driven", desc: "In-depth market insights to keep you ahead of fashion trends", gradient: "from-blue-400 to-indigo-500" }
              ].map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.25 }}
                >
                  <Card className={`bg-white/10 backdrop-blur-lg border-white/20 p-6 transform transition-transform duration-300 hover:rotate-0 rounded-xl ${index === 1 ? 'ml-10 -rotate-2 shadow-lg' : 'rotate-2 shadow-md'}`}>
                    <CardContent className="p-0">
                      <div className="flex items-center space-x-4 mb-5">
                        <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center shadow-inner">
                          <card.Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-lg">{card.title}</h3>
                          <p className="text-gray-300 text-sm">{card.desc}</p>
                        </div>
                      </div>
                      <div className={`w-full h-2 rounded-full bg-gradient-to-r ${card.gradient}`}></div>
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
        className="container mx-auto px-6 py-24"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
            Why Choose ADOGENT?
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Access exclusive fashion from the world’s finest sellers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {[ 
            {
              icon: <Cpu className="w-8 h-8" />,
              title: "AI-Powered Analysis",
              description: "Smart recommendations based on market data",
              color: "from-teal-500 to-teal-600"
            },
            {
              icon: <BarChart3 className="w-8 h-8" />,
              title: "Data-Driven Insights",
              description: "Real-time analytics to make informed decisions",
              color: "from-blue-500 to-blue-600"
            },
            {
              icon: <Rocket className="w-8 h-8" />,
              title: "Automated Transactions",
              description: "AI agents that make the buying and selling easier",
              color: "from-green-500 to-green-600"
            },
            {
              icon: <Store className="w-8 h-8" />,
              title: "Verified Luxury Goods",
              description: "Authenticate and verify your products seamlessly",
              color: "from-purple-500 to-purple-600"
            }
          ].map((feature, index) => (
            <motion.div 
              key={index} 
              whileInView={{ opacity: 1, y: 0 }} 
              initial={{ opacity: 0, y: 20 }} 
              transition={{ delay: index * 0.3 }}
            >
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 group rounded-xl shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-3">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="container mx-auto px-6 py-24"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-16 text-center rounded-2xl shadow-xl max-w-3xl mx-auto">
          <CardContent className="p-0">
            <h2 className="text-3xl font-extrabold text-white mb-6">Get Started Today</h2>
            <p className="text-gray-400 mb-12 max-w-xl mx-auto text-lg leading-relaxed">
              Revolutionizing the luxury e-commerce experience with AI-powered agents.
            </p>

            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link to="/marketplace">
                  <Button className="bg-teal-500 hover:bg-teal-600 text-white px-10 py-4 rounded-xl text-lg font-semibold">
                    Start Shopping
                  </Button>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }}>
                <Link to="/ai-assistant">
                  <Button variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-10 py-4 rounded-xl text-lg font-semibold">
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
