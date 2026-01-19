import profile from "@/data/profile.json";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-4 border-t border-border">
      <div className="container text-center">
        <p className="text-muted-foreground mb-2">
          ⭐ Turning data and code into systems that make a difference.
        </p>
        <p className="text-sm text-muted-foreground/70">
          © {currentYear} {profile.name}. Built with passion and coffee ☕
        </p>
      </div>
    </footer>
  );
};

export default Footer;
