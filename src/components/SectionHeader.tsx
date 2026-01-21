import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  seeMoreLink?: string;
  seeMoreText?: string;
}

const SectionHeader = ({
  title,
  subtitle,
  seeMoreLink,
  seeMoreText = "See All",
}: SectionHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
    >
      <div>
        <h2 className="section-title mb-2">{title}</h2>
        {subtitle && (
          <p className="text-muted-foreground max-w-2xl">{subtitle}</p>
        )}
      </div>
      
      {seeMoreLink && (
        <Link
          to={seeMoreLink}
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline group shrink-0"
        >
          {seeMoreText}
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </motion.div>
  );
};

export default SectionHeader;
