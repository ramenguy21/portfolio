import React, { type ReactNode } from "react";
import { Github, Mail, Phone, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Button from "./components/button";
import ExperienceCard from "./components/exp-card";
import ProjectCard from "./components/project-card";
import { BentoGrid } from "./components/bento-grid";
import { useBlogPosts } from "./utils/useBlogPosts";
import Header from "./components/header";
import Footer from "./components/footer";
import { useNavigate } from "react-router-dom";

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
    <section id={id} className={`py-16 sm:py-20 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-3xl sm:text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 to-neutral-400"
        >
          {title}
        </motion.h2>
        {children}
      </div>
    </section>
  );
};

// Hero Section Component
const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950" />

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6"
          >
            <Sparkles size={16} className="text-cyan-400" />
            <span className="text-sm text-cyan-400 font-medium">
              Senior Full Stack Engineer
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 via-neutral-200 to-neutral-100">
              Muhammad Hamza Asad
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-neutral-400 mb-6"
          >
            Next.js <span className="text-cyan-400">•</span> GoLang{" "}
            <span className="text-cyan-400">•</span> AWS/DevOps
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base sm:text-lg text-neutral-500 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Building scalable, high-performance web applications with 3+ years
            of experience in full-stack development, cloud infrastructure, and
            DevOps automation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button href="#contact">
              <Mail size={20} />
              Get In Touch
              <ArrowRight size={16} />
            </Button>
            <Button variant="secondary" href="https://github.com/ramenguy21">
              <Github size={20} />
              View My Work
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Main Portfolio Component
const App: React.FC = () => {
  const posts = useBlogPosts();
  const navigate = useNavigate();

  const experiences = [
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

  const projects = [
    {
      title: "Huffman Encoding Image Compression",
      description:
        "Used the Python Imaging Library (PIL) to read and manipulate image data and store it in a Huffman tree for efficient compression.",
      technologies: ["Python", "PIL", "Data Structures", "Algorithms"],
      impact: "70% file size reduction",
    },
    {
      title: "Kitab Ghar Website",
      description:
        "Developed a low-cost ticketing system for a community library, ensuring code readability and open-sourcing the project.",
      technologies: ["TypeScript", "Tailwind CSS", "Netlify"],
      link: "#",
      impact: "Serving 500+ library members",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950">
      <Header />
      <Hero />

      <Section id="about" title="About Me">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <div className="rounded-2xl border border-neutral-800/50 bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 backdrop-blur-xl p-6 sm:p-8">
            <p className="text-base sm:text-lg text-neutral-400 leading-relaxed text-center">
              I'm a passionate full-stack software engineer with a strong
              foundation in modern web technologies. Currently pursuing my
              Bachelor's in Mathematics at Karachi University, I combine
              analytical thinking with practical development skills to create
              scalable, user-friendly applications.
            </p>
          </div>
        </motion.div>
      </Section>

      <Section id="experience" title="Work Experience">
        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} {...exp} />
          ))}
        </div>
      </Section>

      <Section id="projects" title="Featured Projects">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </Section>

      <Section id="skills" title="Tech Stack">
        <div className="max-w-6xl mx-auto">
          <BentoGrid />
        </div>
      </Section>

      <Section id="contact" title="Get In Touch">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-lg sm:text-xl mb-12 text-neutral-400 text-center">
              Ready to bring your ideas to life? Let's discuss your next
              project.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
              <div className="rounded-2xl border border-neutral-800/50 bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 backdrop-blur-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Mail size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-100">Email</h3>
                </div>
                <p className="text-neutral-400">m.hamza.asad.22@gmail.com</p>
              </div>
              <div className="rounded-2xl border border-neutral-800/50 bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 backdrop-blur-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Phone size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-100">Phone</h3>
                </div>
                <p className="text-neutral-400">03351313259</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="mailto:m.hamza.asad.22@gmail.com"
                variant="secondary"
              >
                <Mail size={20} />
                Send Email
              </Button>
              <Button href="https://github.com/ramenguy21" variant="outline">
                <Github size={20} />
                GitHub Profile
              </Button>
            </div>
          </motion.div>
        </div>
      </Section>

      <Section id="blog-preview" title="Latest Blog Posts">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col gap-6 mb-8">
            {posts.slice(0, 2).map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group rounded-2xl border border-neutral-800/50 bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 backdrop-blur-xl p-6 hover:border-cyan-500/30 transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/blog/${post.slug}`)}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-100 group-hover:text-cyan-400 transition-colors duration-300">
                    {post.title}
                  </h3>
                  <span className="text-xs text-neutral-500 whitespace-nowrap">
                    {post.date}
                  </span>
                </div>
                <p className="text-neutral-400 text-sm sm:text-base line-clamp-2">
                  {post.content
                    .split("\n")
                    .find((line) => line.trim())
                    ?.slice(0, 150)}
                  ...
                </p>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Button onClick={() => navigate("/blog")}>
              View All Blog Posts
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default App;
