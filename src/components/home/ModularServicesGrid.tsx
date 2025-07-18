import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Package, Lightbulb, Wrench } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { products, solutions, services } from '@/data/ecosystem';

const ModularServicesGrid: React.FC = () => {
  // Échantillons représentatifs de chaque catégorie
  const featuredProducts = products.slice(0, 2);
  const featuredSolutions = solutions.slice(0, 2);
  const featuredServices = services.filter(s => s.category === 'seo' || s.category === 'ads').slice(0, 2);

  const categories = [
    {
      id: 'products',
      title: '🏢 Produits Finis',
      subtitle: 'Solutions complètes clé en main',
      items: featuredProducts,
      color: 'from-blue-500 to-cyan-400',
      icon: <Package className="w-8 h-8" />
    },
    {
      id: 'solutions', 
      title: '🤖 Solutions IA',
      subtitle: 'Outils intelligents propriétaires',
      items: featuredSolutions,
      color: 'from-purple-500 to-pink-400', 
      icon: <Lightbulb className="w-8 h-8" />
    },
    {
      id: 'services',
      title: '🛠️ Services Premium',
      subtitle: 'Expertise humaine + IA',
      items: featuredServices,
      color: 'from-orange-500 to-red-400',
      icon: <Wrench className="w-8 h-8" />
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-['Montserrat']">
            🚀 Écosystème <span className="text-gradient">Iluma™</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            <strong>Produits</strong> finis • <strong>Solutions IA</strong> propriétaires • <strong>Services</strong> premium sur-mesure
          </p>
        </motion.div>

        <div className="space-y-12">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
            >
              {/* Category Header */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {category.icon}
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground font-['Montserrat']">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground">{category.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* Category Items */}
              <div className="grid md:grid-cols-2 gap-6">
                {category.items.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="group"
                    >
                      <Card className="h-full glass-effect border-border/30 hover:border-primary/50 transition-all duration-500 overflow-hidden relative">
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                        
                        <div className="p-6 relative z-10">
                          <div className="flex items-start gap-4 mb-4">
                            <motion.div
                              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white`}
                              whileHover={{ scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <IconComponent className="w-6 h-6" />
                            </motion.div>
                            <div className="flex-1">
                              <h4 className="text-xl font-bold text-foreground mb-1 font-['Montserrat'] group-hover:text-primary transition-colors">
                                {item.name}
                              </h4>
                              <p className="text-primary font-semibold text-sm mb-2">
                                {item.title}
                              </p>
                              <p className="text-muted-foreground text-sm leading-relaxed">
                                {item.description}
                              </p>
                            </div>
                          </div>

                          {/* Features */}
                          {item.features && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {item.features.slice(0, 3).map((feature, idx) => (
                                <Badge
                                  key={idx}
                                  variant="secondary"
                                  className="bg-muted/50 hover:bg-primary/10 transition-colors text-xs"
                                >
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          )}

                          {/* Pricing */}
                          {item.pricing && (
                            <div className="mb-4">
                              <Badge className={`bg-gradient-to-r ${item.color} text-white font-bold px-3 py-1 text-xs`}>
                                {item.pricing}
                              </Badge>
                            </div>
                          )}

                          {/* CTA */}
                          <Link to={item.path}>
                            <Button 
                              size="sm"
                              className="w-full group/btn bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary transition-all duration-300"
                            >
                              {category.id === 'products' ? 'Commander' : 
                               category.id === 'solutions' ? 'Utiliser' : 'Découvrir'}
                              <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Card className="glass-effect border-primary/30 p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4 font-['Montserrat']">
              🔗 Écosystème Connecté
            </h3>
            <p className="text-muted-foreground mb-6">
              Nos modules se synchronisent automatiquement pour maximiser votre impact digital
            </p>
            <Link to="/presentation-outils">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                <Brain className="w-5 h-5 mr-2" />
                Voir Tous nos Produits, Solutions & Services
              </Button>
            </Link>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ModularServicesGrid;