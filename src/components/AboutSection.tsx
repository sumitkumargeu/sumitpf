import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronRight } from "lucide-react";
import aboutData from "@/data/about.json";

const AboutSection = () => {
  const [expandedHighlight, setExpandedHighlight] = useState<string | null>(null);
  const [expandedEducation, setExpandedEducation] = useState(false);
  const [expandedVenture, setExpandedVenture] = useState<string | null>(null);
  const [isTouching, setIsTouching] = useState(false);

  const handleTouchStart = useCallback((id: string, type: 'highlight' | 'education' | 'venture') => {
    setIsTouching(true);
    if (type === 'highlight') setExpandedHighlight(id);
    else if (type === 'education') setExpandedEducation(true);
    else setExpandedVenture(id);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setTimeout(() => {
      setIsTouching(false);
      setExpandedHighlight(null);
      setExpandedEducation(false);
      setExpandedVenture(null);
    }, 2000);
  }, []);

  // Sort highlights by priority
  const sortedHighlights = [...aboutData.highlights].sort((a, b) => a.priority - b.priority);
  const sortedVentures = [...aboutData.ventures].sort((a, b) => a.priority - b.priority);

  return (
    <section id="about" className="py-20 px-4">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">About Me</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Highlights with hover preview */}
          <motion.div
            layout
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            {sortedHighlights.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                onHoverStart={() => setExpandedHighlight(item.id)}
                onHoverEnd={() => !isTouching && setExpandedHighlight(null)}
                onTouchStart={() => handleTouchStart(item.id, 'highlight')}
                onTouchEnd={handleTouchEnd}
                className={`glass-card rounded-xl p-4 card-hover cursor-pointer transition-all duration-300 ${
                  expandedHighlight === item.id ? "z-10" : "z-0"
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl">{item.icon}</span>
                  <p className="text-foreground/90">{item.text}</p>
                </div>

                {/* Expanded Preview */}
                <AnimatePresence>
                  {expandedHighlight === item.id && item.preview && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border pt-3 mt-3 ml-10">
                        <h4 className="text-sm font-semibold text-primary mb-2">
                          {item.preview.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-2">
                          {item.preview.details}
                        </p>
                        
                        {item.preview.projects && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {item.preview.projects.map((project, i) => (
                              <span key={i} className="text-xs bg-secondary px-2 py-0.5 rounded-full">
                                {project}
                              </span>
                            ))}
                          </div>
                        )}

                        {item.preview.domains && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {item.preview.domains.map((domain, i) => (
                              <span key={i} className="text-xs bg-primary/20 px-2 py-0.5 rounded-full">
                                {domain}
                              </span>
                            ))}
                          </div>
                        )}

                        {item.preview.languages && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {item.preview.languages.map((lang, i) => (
                              <span key={i} className="text-xs bg-secondary px-2 py-0.5 rounded-full">
                                {lang}
                              </span>
                            ))}
                          </div>
                        )}

                        {item.preview.achievements && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {item.preview.achievements.map((ach, i) => (
                              <span key={i} className="text-xs bg-primary/20 px-2 py-0.5 rounded-full">
                                {ach}
                              </span>
                            ))}
                          </div>
                        )}

                        {item.preview.activities && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {item.preview.activities.map((act, i) => (
                              <span key={i} className="text-xs bg-secondary px-2 py-0.5 rounded-full">
                                {act}
                              </span>
                            ))}
                          </div>
                        )}

                        {item.preview.link && (
                          <a
                            href={item.preview.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-primary mt-2 hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Visit Site <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            layout
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Education Card with Hover Preview */}
            <motion.div
              layout
              onHoverStart={() => setExpandedEducation(true)}
              onHoverEnd={() => !isTouching && setExpandedEducation(false)}
              onTouchStart={() => handleTouchStart('education', 'education')}
              onTouchEnd={handleTouchEnd}
              className={`glass-card rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                expandedEducation ? "z-10" : "z-0"
              }`}
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span>🎓</span> Education
              </h3>
              <div className="space-y-2">
                <p className="font-medium">{aboutData.education.degree}</p>
                <p className="text-muted-foreground">{aboutData.education.specialization}</p>
                <p className="text-sm text-muted-foreground">{aboutData.education.university}</p>
                <p className="text-sm text-primary">Expected: {aboutData.education.expectedGraduation}</p>
              </div>

              {/* Education Expanded Preview */}
              <AnimatePresence>
                {expandedEducation && aboutData.education.preview && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-border pt-4 mt-4">
                      <h4 className="text-sm font-semibold text-primary mb-3">
                        {aboutData.education.preview.title}
                      </h4>
                      
                      <ul className="space-y-2 mb-4">
                        {aboutData.education.preview.details.map((detail, i) => (
                          <li key={i} className="flex justify-between text-xs">
                            <span className="text-muted-foreground">{detail.label}</span>
                            <span className="font-medium">{detail.value}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mb-3">
                        <p className="text-xs font-medium mb-1.5">Key Courses:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {aboutData.education.preview.courses.map((course, i) => (
                            <span key={i} className="text-xs bg-secondary px-2 py-0.5 rounded-full">
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-medium mb-1.5">Activities:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {aboutData.education.preview.activities.map((activity, i) => (
                            <span key={i} className="text-xs bg-primary/20 px-2 py-0.5 rounded-full">
                              {activity}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Ventures with Hover Preview */}
            <motion.div layout className="grid gap-4">
              {sortedVentures.map((venture) => (
                <motion.div
                  key={venture.id}
                  layout
                  onHoverStart={() => setExpandedVenture(venture.id)}
                  onHoverEnd={() => !isTouching && setExpandedVenture(null)}
                  onTouchStart={() => handleTouchStart(venture.id, 'venture')}
                  onTouchEnd={handleTouchEnd}
                  className={`glass-card rounded-xl p-5 card-hover cursor-pointer transition-all duration-300 ${
                    expandedVenture === venture.id ? "z-10" : "z-0"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{venture.icon}</span>
                    <div>
                      <h4 className="font-semibold">{venture.name}</h4>
                      <p className="text-sm text-primary">{venture.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{venture.description}</p>

                  {/* Venture Expanded Preview */}
                  <AnimatePresence>
                    {expandedVenture === venture.id && venture.preview && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-border pt-3 mt-3">
                          <h4 className="text-sm font-semibold text-primary mb-2">
                            {venture.preview.title}
                          </h4>

                          {venture.preview.stats && (
                            <div className="grid grid-cols-3 gap-2 mb-3">
                              <div className="text-center">
                                <p className="text-lg font-bold text-primary">{venture.preview.stats.activeMembers}</p>
                                <p className="text-xs text-muted-foreground">Members</p>
                              </div>
                              <div className="text-center">
                                <p className="text-lg font-bold text-primary">{venture.preview.stats.hackathonsOrganized}</p>
                                <p className="text-xs text-muted-foreground">Hackathons</p>
                              </div>
                              <div className="text-center">
                                <p className="text-lg font-bold text-primary">{venture.preview.stats.projectsCompleted}</p>
                                <p className="text-xs text-muted-foreground">Projects</p>
                              </div>
                            </div>
                          )}

                          {venture.preview.activities && (
                            <div className="flex flex-wrap gap-1.5">
                              {venture.preview.activities.map((activity, i) => (
                                <span key={i} className="text-xs bg-secondary px-2 py-0.5 rounded-full">
                                  {activity}
                                </span>
                              ))}
                            </div>
                          )}

                          {venture.preview.services && (
                            <div className="flex flex-wrap gap-1.5 mb-2">
                              {venture.preview.services.map((service, i) => (
                                <span key={i} className="text-xs bg-primary/20 px-2 py-0.5 rounded-full">
                                  {service}
                                </span>
                              ))}
                            </div>
                          )}

                          {venture.preview.tech && (
                            <div className="flex flex-wrap gap-1.5 mb-2">
                              {venture.preview.tech.map((tech, i) => (
                                <span key={i} className="text-xs bg-secondary px-2 py-0.5 rounded-full">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}

                          {venture.url && (
                            <a
                              href={venture.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-xs text-primary mt-2 hover:underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Visit Site <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>

            {/* Fun Fact */}
            <div className="glass-card rounded-xl p-4 border-l-4 border-primary">
              <p className="text-sm text-muted-foreground">
                <span className="text-primary font-medium">Fun fact:</span> {aboutData.funFact}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
