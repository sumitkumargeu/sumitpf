import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import certifications from "@/data/certifications.json";
import ExpandableCard from "@/components/ExpandableCard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const CertificationsPage = () => {
  // Sort by date (newest first)
  const sortedCerts = [...certifications].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  // Group by issuer
  const issuerGroups = sortedCerts.reduce((acc, cert) => {
    if (!acc[cert.issuer]) {
      acc[cert.issuer] = [];
    }
    acc[cert.issuer].push(cert);
    return acc;
  }, {} as Record<string, typeof certifications>);

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
              Certifications
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Professional certifications and courses completed, organized by issuing platform.
            </p>
          </motion.div>

          {/* All Certifications */}
          <section className="mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-2xl font-semibold mb-6 flex items-center gap-2"
            >
              <span className="text-primary">🏆</span> All Certifications
            </motion.h2>
            
            <motion.div 
              layout
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {sortedCerts.map((cert, index) => (
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
          </section>

          {/* By Issuer */}
          <section>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-2xl font-semibold mb-6 flex items-center gap-2"
            >
              <span className="text-primary">📊</span> By Platform
            </motion.h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(issuerGroups).map(([issuer, certs], index) => (
                <motion.div
                  key={issuer}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="glass-card rounded-xl p-4 text-center"
                >
                  <h3 className="font-medium mb-1">{issuer}</h3>
                  <p className="text-2xl font-bold text-primary">
                    {certs.length}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    certificate{certs.length !== 1 ? "s" : ""}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CertificationsPage;
