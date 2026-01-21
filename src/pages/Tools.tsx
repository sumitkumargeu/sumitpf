import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import tools from "@/data/tools.json";
import ExpandableCard from "@/components/ExpandableCard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const ToolsPage = () => {
  // Sort by date (newest first)
  const sortedTools = [...tools].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  const productionTools = sortedTools.filter((t) => t.status === "production");
  const personalTools = sortedTools.filter((t) => t.status === "personal");

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-24 pb-12 px-4">
        <div className="container">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Production Tools
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Developer tools and utilities I've built to solve real-world problems. 
              Sorted by date, newest first.
            </p>
          </motion.div>

          {/* Production Tools */}
          {productionTools.length > 0 && (
            <section className="mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-2xl font-semibold mb-6 flex items-center gap-2"
              >
                <span className="text-primary">🚀</span> Production Ready
              </motion.h2>
              
              <motion.div 
                layout
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {productionTools.map((tool, index) => (
                  <ExpandableCard
                    key={tool.id}
                    id={tool.id}
                    icon={tool.icon}
                    title={tool.title}
                    description={tool.description}
                    details={tool.details}
                    features={tool.features}
                    tags={tool.tags}
                    date={tool.date}
                    links={tool.links}
                    index={index}
                    type="tool"
                  />
                ))}
              </motion.div>
            </section>
          )}

          {/* Personal Tools */}
          {personalTools.length > 0 && (
            <section>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="text-2xl font-semibold mb-6 flex items-center gap-2"
              >
                <span className="text-primary">🔧</span> Personal & Internal Tools
              </motion.h2>
              
              <motion.div 
                layout
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {personalTools.map((tool, index) => (
                  <ExpandableCard
                    key={tool.id}
                    id={tool.id}
                    icon={tool.icon}
                    title={tool.title}
                    description={tool.description}
                    details={tool.details}
                    features={tool.features}
                    tags={tool.tags}
                    date={tool.date}
                    links={tool.links}
                    index={index}
                    type="tool"
                  />
                ))}
              </motion.div>
            </section>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ToolsPage;
