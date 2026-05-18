
import React, { useState } from 'react';
import SectionTitle from './SectionTitle';
import ProjectCard from './ProjectCard';

interface Project {
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  isInDevelopment?: boolean;
  categories: string[];
}

const Projects: React.FC = () => {
  const categories = ["All", "AI", "Full-Stack", "Web", "ML"];
  const [activeCategory, setActiveCategory] = useState("All");

  const projects: Project[] = [
    {
      title: "KitaabSe — AI Audiobook Generator",
      description: "Founder & Developer. AI-driven audiobook platform that converts uploaded PDF books into real-time audiobooks — listen privately or publish publicly for global access. Reduces screen strain and improves accessibility. Full-stack with React + DRF, Redis background tasks, PostgreSQL, JWT Auth, and EdgeTTS + Gemini AI for automatic audio generation, text extraction, and real-time processing. Secure file handling, Docker-based deployment (Render + Netlify), and live audio status tracking.",
      image: "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&w=800&q=80",
      technologies: ["React", "Django REST Framework", "PostgreSQL", "Redis", "JWT", "EdgeTTS", "Gemini AI", "Docker"],
      categories: ["AI", "Full-Stack"]
    },
    {
      title: "Geospatial Platform (Engineer Philosophy)",
      description: "Backend modernization of a legacy geospatial product into a scalable architecture. PostGIS-powered mapping APIs, local DB sync, CRM (Zoho/Salesforce) and payment integrations, indexing + hash partitioning for large-scale performance, and a microservices design with a Rust tile server and Redis + AWS SQS async pipelines.",
      image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80",
      technologies: ["Django REST Framework", "PostgreSQL", "PostGIS", "Rust", "Redis", "AWS SQS", "Docker", "AWS"],
      categories: ["Full-Stack"]
    },
    {
      title: "MCP Agentic AI Chatbot",
      description: "Built an MCP-based agentic AI assistant with tool calling and multi-agent orchestration, embedded inside the product to drive real-world task execution and AI-assisted workflows.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
      technologies: ["MCP", "Multi-Agent", "Tool Calling", "Python", "Claude"],
      categories: ["AI"]
    },
    {
      title: "Haki E-Commerce Website",
      description: "Full-stack responsive e-commerce platform with product galleries, real-time pricing, and a clean UI/UX design.",
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80",
      technologies: ["HTML", "CSS", "JavaScript", "Netlify"],
      liveUrl: "https://hakistore.netlify.app/",
      categories: ["Web", "Full-Stack"]
    },
    {
      title: "Spotify Clone",
      description: "Replicated core Spotify functionality including play, skip, shuffle, repeat, playlist creation, and localStorage persistence.",
      image: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=800&q=80",
      technologies: ["HTML", "CSS", "JavaScript"],
      liveUrl: "https://parvspotify.netlify.app/",
      categories: ["Web"]
    },
    {
      title: "House Price Prediction Model",
      description: "Linear regression model for real estate price forecasting with feature engineering, EDA, and model tuning.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
      technologies: ["Python", "Pandas", "NumPy", "Matplotlib", "Linear Regression"],
      githubUrl: "https://github.com/Parvpaigwar/House-Price-Prediction",
      categories: ["ML"]
    }
  ];
  
  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.categories.includes(activeCategory));
    
  return (
    <section id="projects" className="py-20 px-6 md:px-12 lg:px-24">
      <div className="container mx-auto">
        <SectionTitle 
          title="Featured Projects" 
          subtitle="A selection of my recent work and ongoing projects"
          className="animate-fade-in-up"
        />
        
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-neon-cyan/20 text-neon-cyan'
                  : 'bg-transparent text-soft-purple hover:bg-soft-purple/10'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              image={project.image}
              technologies={project.technologies}
              liveUrl={project.liveUrl}
              githubUrl={project.githubUrl}
              isInDevelopment={project.isInDevelopment}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
