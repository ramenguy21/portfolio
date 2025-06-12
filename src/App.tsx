import React, { useState, type ReactNode } from "react";
import { Github, Mail, Phone, Code, Menu, X } from "lucide-react";
import Button from "./components/button";
import Card from "./components/card";
import SkillBadge from "./components/badge";
import ExperienceCard from "./components/exp-card";
import ProjectCard from "./components/project-card";
import { useBlogPosts } from "./utils/useBlogPosts";
import Blog from "./components/blog";
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
      <Header />
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

      <Section id="blog-preview" title="Blog">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex flex-col gap-6 mb-8">
            {posts.slice(0, 2).map((post) => (
              <div
                key={post.slug}
                className="bg-white rounded-lg shadow p-4 text-left"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-800">
                    {post.title}
                  </h3>
                  <span className="text-xs text-gray-500">{post.date}</span>
                </div>
                <p className="text-gray-600">
                  {post.content
                    .split("\n")
                    .find((line) => line.trim())
                    ?.slice(0, 100)}
                  ...
                </p>
              </div>
            ))}
          </div>
          <Button onClick={() => navigate("/blog")}>View All Blog Posts</Button>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default App;
