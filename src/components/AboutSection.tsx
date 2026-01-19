import { motion } from "framer-motion";
import profile from "@/data/profile.json";
import socials from "@/data/socials.json";

const AboutSection = () => {
  const highlights = [
    { icon: "🤖", text: "Passionate about AI, IoT, and Automation Systems" },
    { icon: "🌍", text: "Building solutions that bridge physical devices and digital insights" },
    { icon: "🐍", text: `Strong in Python (${profile.experience.yearsOfCoding} years) and C++` },
    { icon: "🎓", text: `${profile.education.degree} at ${profile.education.university}` },
    { icon: "👥", text: `Community Owner of Team Dexter (${socials.ventures[0].stats.activeMembers} members)` },
    { icon: "🚗", text: "Co-founder of PayDrive.in - Vehicle Insurance Agency" },
  ];

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

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className="flex items-start gap-4 p-4 glass-card rounded-xl card-hover"
              >
                <span className="text-2xl">{item.icon}</span>
                <p className="text-foreground/90">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Education Card */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span>🎓</span> Education
              </h3>
              <div className="space-y-2">
                <p className="font-medium">{profile.education.degree}</p>
                <p className="text-muted-foreground">{profile.education.specialization}</p>
                <p className="text-sm text-muted-foreground">{profile.education.university}</p>
                <p className="text-sm text-primary">Expected: {profile.education.expectedGraduation}</p>
              </div>
            </div>

            {/* Ventures */}
            <div className="grid gap-4">
              {socials.ventures.map((venture) => (
                <a
                  key={venture.id}
                  href={venture.url || "#"}
                  target={venture.url ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="glass-card rounded-xl p-5 card-hover block"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{venture.icon}</span>
                    <div>
                      <h4 className="font-semibold">{venture.name}</h4>
                      <p className="text-sm text-primary">{venture.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{venture.description}</p>
                </a>
              ))}
            </div>

            {/* Fun Fact */}
            <div className="glass-card rounded-xl p-4 border-l-4 border-primary">
              <p className="text-sm text-muted-foreground">
                <span className="text-primary font-medium">Fun fact:</span> {profile.funFact}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
