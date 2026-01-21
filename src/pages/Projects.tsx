import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import projects from "@/data/projects.json";
import ExpandableCard from "@/components/ExpandableCard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const ProjectsPage = () => {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

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
              All Projects
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              A complete collection of projects showcasing my expertise in AI, 
              data analysis, and full-stack development.
            </p>
          </motion.div>

          {/* Featured Projects */}
          {featuredProjects.length > 0 && (
            <section className="mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-2xl font-semibold mb-6 flex items-center gap-2"
              >
                <span className="text-primary">⭐</span> Featured
              </motion.h2>
              
              <motion.div 
                layout
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
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
            </section>
          )}

          {/* Other Projects */}
          {otherProjects.length > 0 && (
            <section>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="text-2xl font-semibold mb-6 flex items-center gap-2"
              >
                <span className="text-primary">📁</span> Other Projects
              </motion.h2>
              
              <motion.div 
                layout
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {otherProjects.map((project, index) => (
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
            </section>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProjectsPage;
