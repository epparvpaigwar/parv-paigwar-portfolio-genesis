
import React from 'react';
import SectionTitle from './SectionTitle';
import { Code, Database, Server, Cloud, Award, Brain } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 px-6 md:px-12 lg:px-24 relative">
      <div className="container mx-auto">
        <SectionTitle 
          title="About Me" 
          subtitle="Get to know more about my background and passions"
          className="animate-fade-in-up"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in-up">
            <p className="text-lg text-gray-300">
              I'm a <span className="text-neon-cyan font-medium">Backend Developer</span> with 1 year of experience
              building scalable systems and APIs using Python, Django REST Framework, PostgreSQL, AWS, and Docker.
            </p>

            <p className="text-lg text-gray-300">
              Currently <span className="text-neon-cyan font-medium">Associate Software Engineer at Engineer Philosophy</span>,
              where I lead backend work on a geospatial platform — modernizing legacy systems, designing PostGIS-powered APIs,
              and integrating CRMs (Zoho, Salesforce) and payment workflows.
            </p>

            <p className="text-lg text-gray-300">
              I shipped a <span className="text-neon-cyan font-medium">Rust tile server</span> with async pipelines on
              Redis + AWS SQS, boosting throughput by up to <span className="text-neon-cyan font-medium">80%</span>.
              I also built an <span className="text-neon-cyan font-medium">MCP-based agentic AI chatbot</span> with tool
              calling and multi-agent orchestration that drives real workflows inside the product.
            </p>

            <p className="text-lg text-gray-300">
              I care about <span className="text-neon-cyan font-medium">distributed systems, database architecture,</span> and
              writing seamless, high-performance software designed to handle large-scale traffic.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {[
              {
                icon: <Server className="text-neon-cyan" size={24} />,
                title: "Backend Engineering",
                description: "Django, DRF, FastAPI, Flask — RESTful APIs, Celery, JWT, and high-performance services"
              },
              {
                icon: <Database className="text-neon-cyan" size={24} />,
                title: "Databases & PostGIS",
                description: "PostgreSQL, MySQL, MongoDB — indexing, hash partitioning, geospatial queries"
              },
              {
                icon: <Brain className="text-neon-cyan" size={24} />,
                title: "MCP Agentic AI",
                description: "Built MCP chatbots with tool calling and multi-agent orchestration for real task execution"
              },
              {
                icon: <Cloud className="text-neon-cyan" size={24} />,
                title: "AWS + Docker",
                description: "Containerized deployments, AWS SQS async pipelines, scalable production infrastructure"
              },
              {
                icon: <Code className="text-neon-cyan" size={24} />,
                title: "Rust + Microservices",
                description: "High-performance Rust tile server with async Redis pipelines — up to 80% faster"
              },
              {
                icon: <Award className="text-neon-cyan" size={24} />,
                title: "Data Science & ML",
                description: "Pandas, NumPy, Matplotlib, Seaborn — regression, feature engineering, clustering"
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="glass-card p-6 transition-all duration-300 hover:border-neon-cyan/30 group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-12 w-12 rounded-lg bg-deep-blue/50 flex items-center justify-center mb-4 group-hover:bg-neon-cyan/10 transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">{item.title}</h3>
                <p className="text-soft-purple text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
