
import React, { useEffect } from "react";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Scene3D from "@/components/Scene3D";

const Index: React.FC = () => {
  useEffect(() => {
    // Easter egg: Konami code
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiPosition = 0;

    const handleKonami = (e: KeyboardEvent) => {
      if (e.key === konamiCode[konamiPosition]) {
        konamiPosition++;
        if (konamiPosition === konamiCode.length) {
          activateEasterEgg();
          konamiPosition = 0;
        }
      } else {
        konamiPosition = 0;
      }
    };

    const activateEasterEgg = () => {
      console.log("%c🎮 Konami Code Activated! You found the easter egg!", "color: #64ffda; font-size: 24px; font-weight: bold;");
      console.log("%cHello, fellow developer! Thanks for checking out my portfolio.", "color: #8892b0; font-size: 16px;");
      
      // Create a temporary element to show a visual effect
      const egg = document.createElement("div");
      egg.style.position = "fixed";
      egg.style.top = "50%";
      egg.style.left = "50%";
      egg.style.transform = "translate(-50%, -50%)";
      egg.style.background = "rgba(0, 0, 0, 0.8)";
      egg.style.color = "#64ffda";
      egg.style.padding = "20px";
      egg.style.borderRadius = "10px";
      egg.style.zIndex = "9999";
      egg.style.fontFamily = "monospace";
      egg.style.fontSize = "18px";
      egg.innerHTML = `
        <h3>🎮 Easter Egg Found!</h3>
        <p>You've discovered the secret Konami code!</p>
        <p>Thanks for exploring my portfolio thoroughly.</p>
        <p>- Parv Paigwar</p>
      `;
      document.body.appendChild(egg);
      
      setTimeout(() => {
        egg.style.opacity = "0";
        egg.style.transition = "opacity 1s ease";
        setTimeout(() => document.body.removeChild(egg), 1000);
      }, 3000);
    };

    document.addEventListener('keydown', handleKonami);
    
    return () => {
      document.removeEventListener('keydown', handleKonami);
    };
  }, []);

  return (
    <div className="min-h-screen text-white relative">
      <Scene3D />
      <NavBar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
