import { motion } from "framer-motion";
import socials from "@/data/socials.json";
import profile from "@/data/profile.json";
import { ExternalLink } from "lucide-react";
import ContactCard from "./ContactCard";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 px-4">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Connect</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Open for collaborations, job opportunities, and interesting project discussions.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div 
            layout
            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
          >
            {socials.links.map((link, index) => (
              <ContactCard
                key={link.id}
                id={link.id}
                name={link.name}
                icon={link.icon}
                url={link.url}
                username={link.username}
                description={link.description}
                responseTime={link.responseTime}
                stats={link.stats}
                index={index}
              />
            ))}
          </motion.div>

          {/* Email CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 text-center"
          >
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity text-lg"
            >
              Say Hello 👋
              <ExternalLink className="w-5 h-5" />
            </a>
            <p className="text-sm text-muted-foreground mt-4">
              Response time: Within 24 hours
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
