import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import projects from "@/data/projects.json";
import ExpandableCard from "./ExpandableCard";
import SectionHeader from "./SectionHeader";

const ProjectsSection = () => {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <section id="projects" className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
      
      <div className="container relative z-10">
        <SectionHeader
          title="Featured Projects"
          subtitle="A collection of projects showcasing my expertise in AI, data analysis, and full-stack development."
          seeMoreLink="/projects"
          seeMoreText="View All Projects"
        />

        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-6"
        >
          {featuredProjects.map((project, index) => (
            <ExpandableCard
              key={project.id}
              id={project.id}
              icon={project.icon}
              title={project.name}
              description={project.description}
              features={project.features}
              tags={project.technologies}
              links={project.links}
              index={index}
              type="project"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
