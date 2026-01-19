import { motion } from "framer-motion";
import achievements from "@/data/achievements.json";

const StatsSection = () => {
  const stats = [
    {
      icon: "💻",
      label: "LeetCode",
      value: achievements.leetcode.problemsSolved + "+",
      subtext: `Rating: ${achievements.leetcode.contestRating}`,
    },
    {
      icon: "🏆",
      label: "Problems",
      value: "256+",
      subtext: "C++ & Python",
    },
    {
      icon: "📊",
      label: "Max Streak",
      value: achievements.leetcode.maxStreak + " days",
      subtext: "Consistent coding",
    },
    {
      icon: "🚀",
      label: "Projects",
      value: "15+",
      subtext: "Production apps",
    },
  ];

  return (
    <section className="py-16 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 text-center card-hover"
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-bold stat-highlight mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <div className="text-xs text-muted-foreground/70 mt-1">
                {stat.subtext}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
