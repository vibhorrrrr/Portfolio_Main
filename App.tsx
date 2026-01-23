
import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { PROJECTS, RESEARCH } from './constants';
import { SystemProject } from './types';
import BootSequence from './components/BootSequence';
import Hero from './components/Hero';
import Sidebar from './components/Sidebar';
import ProjectSection from './components/ProjectSection';
import GlobalNeuralBackground from './components/GlobalNeuralBackground';
import SystemTelemetry from './components/SystemTelemetry';
import ThemeToggle from './components/ThemeToggle';
import CustomCursor from './components/CustomCursor';
import Modal from './components/Modal';
import ScrollProgress from './components/ScrollProgress';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import EducationSection from './components/EducationSection';

// Interactive Modules
import LogisticsVisual from './components/InteractiveModules/LogisticsVisual';
import PolicySentimentVisual from './components/InteractiveModules/PolicySentimentVisual';
import Seq2SeqVisual from './components/InteractiveModules/Seq2SeqVisual';
import MedicalVisual from './components/InteractiveModules/MedicalVisual';
import CausalInferenceMap from './components/InteractiveModules/CausalInferenceMap';
import VajraLogic from './components/InteractiveModules/VajraLogic';
import F1Strategy from './components/InteractiveModules/F1Strategy';
import ARCVisual from './components/InteractiveModules/ARCVisual';
import CounterfactualVisual from './components/InteractiveModules/CounterfactualVisual';
import PlaceboVisual from './components/InteractiveModules/PlaceboVisual';
import DatingVisual from './components/InteractiveModules/DatingVisual';
import SecondOrderVisual from './components/InteractiveModules/SecondOrderVisual';

const App: React.FC = () => {
  const [booted, setBooted] = useState(false);
  const [isSystemLocked, setIsSystemLocked] = useState(true);
  const [activeSection, setActiveSection] = useState<string>('');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [time, setTime] = useState(new Date());
  
  // Lifted Modal State
  const [modalProject, setModalProject] = useState<SystemProject | null>(null);

  // Toggle Theme Logic
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
        root.classList.add('dark');
    } else {
        root.classList.remove('dark');
    }
  }, [theme]);

  // Handle Scroll Lock
  useEffect(() => {
    if (isSystemLocked) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
  }, [isSystemLocked]);

  // Live Clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    // Scroll spy for active section
    const handleScroll = () => {
        const sections = PROJECTS.map(p => p.id);
        const scrollPosition = window.scrollY + window.innerHeight / 3;

        // Check Hero
        if (window.scrollY < window.innerHeight / 2) {
            setActiveSection('hero');
            return;
        }

        for (const id of sections) {
            const element = document.getElementById(id);
            if (element) {
                const { offsetTop, offsetHeight } = element;
                if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                    setActiveSection(id);
                }
            }
        }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = useCallback((id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Keyboard Navigation Controller
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (isSystemLocked) return;

        // Ignore if focus is on an input or if modal is open (unless it's Escape)
        if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;
        
        if (modalProject) {
            if (e.key === 'Escape') {
                setModalProject(null);
            }
            return;
        }

        const projectIds = PROJECTS.map(p => p.id);
        const currentIndex = projectIds.indexOf(activeSection);

        switch (e.key) {
            case 'ArrowDown':
            case 'ArrowRight':
                e.preventDefault();
                if (activeSection === 'hero' || activeSection === '') {
                    handleNavigate(projectIds[0]);
                } else if (currentIndex < projectIds.length - 1) {
                    handleNavigate(projectIds[currentIndex + 1]);
                } else if (currentIndex === projectIds.length - 1) {
                     const researchEl = document.getElementById('research');
                     researchEl?.scrollIntoView({ behavior: 'smooth' });
                }
                break;
            case 'ArrowUp':
            case 'ArrowLeft':
                e.preventDefault();
                if (currentIndex > 0) {
                    handleNavigate(projectIds[currentIndex - 1]);
                } else if (currentIndex === 0) {
                     window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                     if (window.scrollY > 100) {
                         handleNavigate(projectIds[projectIds.length - 1]);
                     }
                }
                break;
            case 'Enter':
            case ' ':
                if (activeSection && activeSection !== 'hero') {
                    e.preventDefault();
                    const project = PROJECTS.find(p => p.id === activeSection);
                    if (project) setModalProject(project);
                }
                break;
        }
    };

    if (booted) {
        window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [booted, activeSection, modalProject, handleNavigate, isSystemLocked]);

  return (
    <>
      <AnimatePresence>
        {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      </AnimatePresence>

      {booted && (
        <main className="bg-slate-50 dark:bg-black min-h-screen text-slate-900 dark:text-off-white selection:bg-blue-300 dark:selection:bg-neural dark:selection:text-black relative transition-colors duration-500">
          
          {/* Global Enhancements */}
          <CustomCursor />
          {!isSystemLocked && <ScrollProgress />}
          <GlobalNeuralBackground theme={theme} />
          <SystemTelemetry />
          <ThemeToggle isDark={theme === 'dark'} toggle={toggleTheme} />
          
          {!isSystemLocked && <Sidebar activeId={activeSection} onNavigate={handleNavigate} />}
          
          <div className={isSystemLocked ? 'relative z-10' : 'lg:pl-64 relative z-10'}>
            <Hero onEnter={() => setIsSystemLocked(false)} />
            
            <div className="flex flex-col">
              {PROJECTS.map((project) => (
                <React.Fragment key={project.id}>
                    <ProjectSection 
                        project={project} 
                        isActive={activeSection === project.id}
                        onOpenDeepDive={() => setModalProject(project)}
                    >
                        {project.id === 'second-order' && <SecondOrderVisual />}
                        {project.id === 'vajra' && <VajraLogic />}
                        {project.id === 'f1-strategy' && <F1Strategy />}
                        {project.id === 'counterfactual-lab' && <CounterfactualVisual />}
                        {project.id === 'placebo-lab' && <PlaceboVisual />}
                        {project.id === 'dating-lab' && <DatingVisual />}
                        {project.id === 'seq2seq' && <Seq2SeqVisual />}
                        {project.id === 'arc' && <ARCVisual />}
                        {project.id === 'agri-policy' && <CausalInferenceMap />}
                    </ProjectSection>
                </React.Fragment>
              ))}
            </div>

            {/* Experience Section */}
            <ExperienceSection />
            
            {/* Education Section */}
            <EducationSection />

            {/* Research Archive Section */}
            <section id="research" className="py-24 px-8 border-t border-slate-200 dark:border-neutral-800 backdrop-blur-sm">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-12 text-slate-900 dark:text-white">Research Archive</h2>
                    <div className="grid gap-6">
                        {RESEARCH.map((paper) => {
                            const isClickable = !!paper.url;
                            const Wrapper = isClickable ? 'a' : 'div';
                            const props = isClickable ? { 
                                href: paper.url, 
                                target: "_blank", 
                                rel: "noopener noreferrer" 
                            } : {};

                            return (
                                <Wrapper 
                                    key={paper.id}
                                    {...props}
                                    className={`block p-6 border border-slate-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/20 transition-colors group ${isClickable ? 'hover:border-blue-500 dark:hover:border-neural cursor-pointer' : 'cursor-default'}`}
                                >
                                    <div className="text-xs text-blue-600 dark:text-neural mb-2">{paper.venue} {paper.year}</div>
                                    <h3 className="text-lg font-bold text-slate-800 dark:text-neutral-200 group-hover:text-black dark:group-hover:text-white flex items-center gap-2">
                                        {paper.title}
                                        {isClickable && <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>}
                                    </h3>
                                    <p className="text-slate-500 dark:text-neutral-500 text-sm mt-2">{paper.abstract}</p>
                                </Wrapper>
                            );
                        })}
                    </div>
                </div>
            </section>

            <AboutSection />
            
            {/* Footer */}
            <footer className="py-12 text-center text-slate-400 dark:text-neutral-600 text-xs font-mono relative z-10 flex flex-col gap-2">
                <p>SYSTEM STATUS: ONLINE</p>
                <p className="opacity-50 tracking-widest">{time.toISOString().split('.')[0].replace('T', ' ')} UTC</p>
                <p>© 2025 Vibhor Joshi. All Reasoning Modules Active.</p>
            </footer>

          </div>
          
          <Modal 
            isOpen={!!modalProject} 
            onClose={() => setModalProject(null)} 
            title={modalProject?.title || ''}
            techStack={modalProject?.techStack || []}
          />
        </main>
      )}
    </>
  );
};

export default App;
