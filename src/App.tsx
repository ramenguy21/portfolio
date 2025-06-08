import React, {
  useState,
  type ReactNode,
  type MouseEventHandler,
  type ElementType,
} from "react";
import { Github, Mail, Phone, ExternalLink, Code, Menu, X } from "lucide-react";

// Button Props
type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

// Reusable Button Component
const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
}) => {
  const baseClasses =
    "px-6 py-3 rounded-lg font-medium transition-all duration-300 inline-flex items-center gap-2";
  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl",
    secondary:
      "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700",
    outline:
      "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
  };

  const classes = `${baseClasses} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

// Card Props
type CardProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
};

// Reusable Card Component
const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hover = true,
}) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg p-6 ${
        hover ? "hover:shadow-xl transition-shadow duration-300" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

// Section Props
type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
};

// Reusable Section Component
const Section: React.FC<SectionProps> = ({
  id,
  title,
  children,
  className = "",
}) => {
  return (
    <section id={id} className={`py-20 ${className}`}>
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
};

// Skill Badge Props
type SkillBadgeProps = {
  skill: string;
  icon?: ElementType;
};

// Skill Badge Component
const SkillBadge: React.FC<SkillBadgeProps> = ({ skill, icon: Icon }) => {
  return (
    <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-full border border-blue-200">
      {Icon && <Icon size={16} className="text-blue-600" />}
      <span className="text-gray-700 font-medium">{skill}</span>
    </div>
  );
};

// Experience Card Props
type ExperienceCardProps = {
  title: string;
  company: string;
  period: string;
  description: string[];
  technologies?: string[];
};

// Experience Card Component
const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title,
  company,
  period,
  description,
  technologies,
}) => {
  return (
    <Card className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <p className="text-blue-600 font-medium">{company}</p>
        </div>
        <span className="text-gray-500 font-medium mt-2 md:mt-0">{period}</span>
      </div>
      <ul className="text-gray-600 mb-4 space-y-2">
        {description.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            {item}
          </li>
        ))}
      </ul>
      {technologies && (
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </Card>
  );
};

// Project Card Props
type ProjectCardProps = {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
};

// Project Card Component
const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  link,
}) => {
  return (
    <Card className="h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        {link && (
          <Button variant="outline" href={link} className="p-2">
            <ExternalLink size={16} />
          </Button>
        )}
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
          >
            {tech}
          </span>
        ))}
      </div>
    </Card>
  );
};

// Navigation Component
const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="font-bold text-xl text-gray-800">
            Muhammad Hamza Asad
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block py-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

// Hero Section Component
const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-white to-indigo-50"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6">
            Muhammad Hamza Asad
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Full-Stack Software Engineer
          </p>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Ever-curious problem solver with extensive experience in full-stack
            web development using React, Express.js, and modern deployment
            practices. Proficient in building scalable, responsive applications
            and optimizing CI/CD pipelines.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="#contact">
              <Mail size={20} />
              Get In Touch
            </Button>
            <Button variant="secondary" href="https://github.com/ramenguy21">
              <Github size={20} />
              View My Work
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main Portfolio Component
const App: React.FC = () => {
  const experiences: ExperienceCardProps[] = [
    {
      title: "Fullstack Developer",
      company: "Farmevo, Pakistan",
      period: "06/2023 - 09/2023",
      description: [
        "Built a customer-facing web portal using React, Tailwind, and GraphQL, ensuring responsiveness and reusable components",
        "Integrated Hasura for data modeling and optimized frontend-backend communication",
      ],
      technologies: ["React", "Tailwind CSS", "GraphQL", "Hasura"],
    },
    {
      title: "Associate Software Engineer",
      company: "Elphinstone Inc, Pakistan",
      period: "11/2021 - 05/2023",
      description: [
        "Automated CI/CD pipelines using GitHub Actions for deployments to ECS/EKS",
        "Developed a React Native app integrated with ORY for identity management",
        "Streamlined KYC workflows using Temporal Engine and GoLang, working with SOAP-based APIs",
        "Deployed WordPress websites on EC2 using Elementor",
      ],
      technologies: [
        "React Native",
        "GitHub Actions",
        "AWS ECS/EKS",
        "GoLang",
        "WordPress",
      ],
    },
  ];

  const projects: ProjectCardProps[] = [
    {
      title: "Huffman Encoding Image Compression",
      description:
        "Used the Python Imaging Library (PIL) to read and manipulate image data and store it in a Huffman tree for efficient compression.",
      technologies: ["Python", "PIL", "Data Structures", "Algorithms"],
    },
    {
      title: "Kitab Ghar Website",
      description:
        "Developed a low-cost ticketing system for a community library, ensuring code readability and open-sourcing the project.",
      technologies: ["TypeScript", "Tailwind CSS", "Netlify"],
      link: "#",
    },
  ];

  const skills: Record<string, string[]> = {
    "Programming Languages": [
      "JavaScript",
      "TypeScript",
      "Python",
      "C#",
      "C++",
    ],
    Frontend: ["React", "React Native", "Tailwind CSS", "HTML5", "CSS3"],
    Backend: ["Express.js", "Node.js", "GraphQL", "GoLang"],
    Database: ["Hasura", "SQL"],
    "Deployment & DevOps": [
      "AWS",
      "Netlify",
      "Terraform",
      "GitHub Actions",
      "Docker",
    ],
    "Tools & Others": ["Git", "REST APIs", "SOAP APIs", "WordPress"],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <Hero />

      <Section id="about" title="About Me" className="bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-gray-600 leading-relaxed">
            I'm a passionate full-stack software engineer with a strong
            foundation in modern web technologies. Currently pursuing my
            Bachelor's in Mathematics at Karachi University, I combine
            analytical thinking with practical development skills to create
            scalable, user-friendly applications.
          </p>
        </div>
      </Section>

      <Section id="experience" title="Work Experience">
        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} {...exp} />
          ))}
        </div>
      </Section>

      <Section id="projects" title="Featured Projects" className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </Section>

      <Section id="skills" title="Technical Skills">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, skillList]) => (
              <Card key={category}>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Code size={20} className="text-blue-600" />
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill, index) => (
                    <SkillBadge key={index} skill={skill} />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section
        id="contact"
        title="Get In Touch"
        className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl mb-12 text-blue-100">
            Ready to bring your ideas to life? Let's discuss your next project.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20 text-white">
              <div className="flex items-center gap-4 mb-4">
                <Mail className="text-blue-300" size={24} />
                <h3 className="text-xl font-bold">Email</h3>
              </div>
              <p className="text-blue-100">m.hamza.asad.22@gmail.com</p>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20 text-white">
              <div className="flex items-center gap-4 mb-4">
                <Phone className="text-blue-300" size={24} />
                <h3 className="text-xl font-bold">Phone</h3>
              </div>
              <p className="text-blue-100">03351313259</p>
            </Card>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="mailto:m.hamza.asad.22@gmail.com" variant="secondary">
              <Mail size={20} />
              Send Email
            </Button>
            <Button href="https://github.com/ramenguy21" variant="outline">
              <Github size={20} />
              GitHub Profile
            </Button>
          </div>
        </div>
      </Section>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2025 Muhammad Hamza Asad. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
