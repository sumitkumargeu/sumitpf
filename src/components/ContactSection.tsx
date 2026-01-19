import { motion } from "framer-motion";
import socials from "@/data/socials.json";
import profile from "@/data/profile.json";
import { ExternalLink } from "lucide-react";

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
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {socials.links.map((link, index) => (
              <motion.a
                key={link.id}
                href={link.url}
                target={link.url.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="glass-card rounded-xl p-5 text-center card-hover group"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                  {link.icon}
                </div>
                <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">
                  {link.name}
                </h3>
                <p className="text-xs text-muted-foreground truncate">
                  @{link.username.split("@")[0]}
                </p>
              </motion.a>
            ))}
          </div>

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
