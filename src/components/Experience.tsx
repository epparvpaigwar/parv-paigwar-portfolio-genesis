
import React from 'react';
import SectionTitle from './SectionTitle';
import { CheckCircle2, CalendarDays, Building2 } from 'lucide-react';

interface ExperienceItem {
  title: string;
  icon: React.ReactNode;
  company: string;
  period: string;
  location?: string;
  description: string[];
  badges?: string[];
}

const Experience: React.FC = () => {
  const experiences: ExperienceItem[] = [
    {
      title: "Associate Software Engineer",
      icon: <span className="text-xl">💼</span>,
      company: "Engineer Philosophy Web Services Pvt. Ltd.",
      period: "May 2025 – Present",
      location: "📍",
      description: [
        "Led backend development for a geospatial platform, modernizing legacy systems into a scalable architecture — improving stability, reducing issues, and boosting performance for a better user experience.",
        "Designed high-performance APIs and backend services for local DB sync and geospatial mapping (PostGIS), integrating CRM systems (Zoho, Salesforce), payment workflows, and external APIs — contributing to acquiring and retaining global clients.",
        "Optimized large-scale database performance using indexing and hash partitioning; managed containerized deployments with Docker and AWS for scalable, reliable production systems.",
        "Built a microservices architecture with a high-performance Rust tile server and async pipelines using Redis and AWS SQS, improving processing speed and system responsiveness by up to 80% for large-scale geospatial workloads.",
        "Built an MCP-based agentic AI chatbot with tool calling and multi-agent orchestration, enabling real-world task execution and AI-assisted workflows within the product."
      ],
      badges: ["Full Time", "Current"]
    },
    {
      title: "Python Developer Intern",
      icon: <span className="text-xl">🧪</span>,
      company: "Engineer Philosophy Web Services Pvt. Ltd.",
      period: "Feb 2025 – Apr 2025",
      location: "📍",
      description: [
        "Worked on real-world backend systems — handling production issues, API design, and database architecture planning across collaborative engineering teams.",
        "Built backend modules and APIs from scratch, refactoring unstructured legacy code into a clean, scalable, and maintainable system.",
        "Designed and integrated advanced backend features with geospatial processing (PostGIS) and robust database architecture — considering real-world query patterns, scalability, and performance for efficient data handling and seamless frontend integration."
      ],
      badges: ["Internship"]
    }
  ];

  return (
    <section id="experience" className="py-20 px-6 md:px-12 lg:px-24 relative">
      <div className="container mx-auto">
        <SectionTitle 
          title="🧑‍💻 Experience" 
          subtitle="My professional journey so far"
          className="animate-fade-in-up"
        />
        
        <div className="relative ml-4">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-neon-cyan via-neon-cyan/50 to-neon-cyan/5"></div>
          
          {experiences.map((exp, index) => (
            <div 
              key={index}
              className="relative pl-8 pb-12 animate-fade-in-left"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Timeline dot */}
              <div className="absolute left-[-8px] top-1 w-4 h-4 rounded-full border-2 border-neon-cyan bg-dark-bg"></div>
              
              <div className="glass-card p-6 md:p-8 transition-all duration-300 hover:border-neon-cyan/30">
                <div className="flex flex-wrap gap-2 justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    {exp.icon} {exp.title}
                  </h3>
                  <div className="flex gap-2">
                    {exp.badges?.map((badge) => (
                      <span 
                        key={badge}
                        className={`px-3 py-1 text-xs rounded-full ${
                          badge === 'Current' 
                            ? 'bg-neon-cyan/20 text-neon-cyan' 
                            : 'bg-soft-purple/20 text-soft-purple'
                        }`}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 items-center text-soft-purple mb-6">
                  <div className="flex items-center gap-2">
                    <Building2 size={16} />
                    <span>{exp.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} />
                    <span>{exp.period}</span>
                  </div>
                </div>
                
                <ul className="space-y-2">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <CheckCircle2 className="text-neon-cyan mt-1 flex-shrink-0" size={16} />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
