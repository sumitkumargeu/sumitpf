import { motion } from "framer-motion";
import profile from "@/data/profile.json";
import avatarImage from "@/assets/avatar.jpg";

const HeroSection = () => {
  // Use generated avatar as fallback
  const avatarSrc = avatarImage;
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-20">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
          <div className="w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-primary/30 animate-pulse-glow">
              <img
                src={avatarSrc}
                alt={profile.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-2xl shadow-lg">
              💻
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center lg:text-left max-w-xl"
          >
            <p className="text-primary font-medium mb-3 text-lg">
              Hi there <span className="wave-emoji">👋</span>
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              I'm <span className="gradient-text">{profile.name}</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-muted-foreground mb-6">
              {profile.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {profile.bio}
            </p>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
              <span className="skill-badge">🎯 AI & ML</span>
              <span className="skill-badge">🌐 IoT</span>
              <span className="skill-badge">⚡ Full-Stack</span>
              <span className="skill-badge">📊 Data Analysis</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#projects"
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity text-center"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="px-8 py-3 border border-primary/50 text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors text-center"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
