import { motion } from "framer-motion";
import skills from "@/data/skills.json";

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 px-4">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Tech Stack</h2>
        </motion.div>

        {/* Top Skills */}
        <div className="mb-12">
          <h3 className="text-lg font-medium text-muted-foreground mb-6 flex items-center gap-2">
            <span>⭐</span> Core Technologies
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {skills.topSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="glass-card rounded-xl p-5 text-center card-hover group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {skill.icon}
                </div>
                <h4 className="font-semibold mb-1">{skill.name}</h4>
                <p className="text-xs text-muted-foreground">{skill.experience}</p>
                
                {/* Proficiency bar */}
                <div className="mt-3 h-1.5 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiencyLevel * 10}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
                <p className="text-xs text-primary mt-1">{skill.proficiency}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Familiar With & Exploring */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-medium text-muted-foreground mb-4 flex items-center gap-2">
              <span>🔧</span> Familiar With
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.familiarWith.map((skill) => (
                <div
                  key={skill.name}
                  className="glass-card rounded-lg px-4 py-3 flex items-center gap-2 card-hover"
                >
                  <span className="text-xl">{skill.icon}</span>
                  <span className="text-sm font-medium">{skill.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-medium text-muted-foreground mb-4 flex items-center gap-2">
              <span>🎯</span> Exploring
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.exploring.map((skill) => (
                <div
                  key={skill.name}
                  className="glass-card rounded-lg px-4 py-3 flex items-center gap-2 card-hover border border-primary/20"
                >
                  <span className="text-xl">{skill.icon}</span>
                  <span className="text-sm font-medium">{skill.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
