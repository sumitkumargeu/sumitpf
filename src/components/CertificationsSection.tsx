import { motion } from "framer-motion";
import certifications from "@/data/certifications.json";
import ExpandableCard from "./ExpandableCard";
import SectionHeader from "./SectionHeader";

const CertificationsSection = () => {
  const featuredCerts = certifications.filter((c) => c.featured).slice(0, 3);

  return (
    <section id="certifications" className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
      
      <div className="container relative z-10">
        <SectionHeader
          title="Certifications"
          subtitle="Professional certifications and courses completed."
          seeMoreLink="/certifications"
          seeMoreText="View All Certifications"
        />

        <motion.div 
          layout
          className="grid md:grid-cols-3 gap-6"
        >
          {featuredCerts.map((cert, index) => (
            <ExpandableCard
              key={cert.id}
              id={cert.id}
              icon={cert.icon}
              title={cert.title}
              subtitle={cert.issuer}
              description={cert.description}
              tags={cert.skills}
              date={cert.date}
              links={cert.links}
              index={index}
              type="certificate"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsSection;
