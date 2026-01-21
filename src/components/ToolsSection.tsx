import { motion } from "framer-motion";
import tools from "@/data/tools.json";
import ExpandableCard from "./ExpandableCard";
import SectionHeader from "./SectionHeader";

const ToolsSection = () => {
  // Sort by date (newest first) and get featured tools
  const sortedTools = [...tools].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
  
  const featuredTools = sortedTools.filter((t) => t.featured).slice(0, 4);

  return (
    <section id="tools" className="py-20 px-4">
      <div className="container">
        <SectionHeader
          title="Production Tools"
          subtitle="Developer tools and utilities I've built to solve real-world problems."
          seeMoreLink="/tools"
          seeMoreText="View All Tools"
        />

        <motion.div 
          layout
          className="grid md:grid-cols-2 gap-6"
        >
          {featuredTools.map((tool, index) => (
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
      </div>
    </section>
  );
};

export default ToolsSection;
