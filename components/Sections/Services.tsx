import React from 'react';
import { SERVICES, PROJECTS } from '../../constants';
import { ArrowRight } from 'lucide-react';
import { useNavigation } from '../../contexts/NavigationContext';

const Services: React.FC = () => {
  const { navigateToCategory } = useNavigation();

  // Find the main project for each service category
  const getMainProjectImage = (categoryFilter: string): string => {
    // Find projects in this category
    const categoryProjects = PROJECTS.filter(p => p.category === categoryFilter);
    
    if (categoryProjects.length === 0) {
      // Fallback to service image if no projects found
      const service = SERVICES.find(s => s.categoryFilter === categoryFilter);
      return service?.imageUrl || '';
    }

    // First, try to find a project with categoryOrder: 1
    const mainProject = categoryProjects.find(p => p.categoryOrder === 1);
    if (mainProject) {
      return mainProject.imageUrl;
    }

    // Otherwise, use the first project in the category
    return categoryProjects[0].imageUrl;
  };

  return (
    <section id="services" className="py-24 border-b border-zinc-900 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-16 border-b border-zinc-900 pb-8">
          <h2 className="font-display text-4xl font-bold text-white uppercase tracking-tight">
            Our Expertise
          </h2>
          <span className="text-zinc-600 font-mono text-xs">(02) Services</span>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 relative">
            {/* Vertical Dividers for Desktop */}
            <div className="absolute inset-y-0 left-1/3 w-px bg-zinc-900 hidden md:block"></div>
            <div className="absolute inset-y-0 left-2/3 w-px bg-zinc-900 hidden md:block"></div>

            {SERVICES.map((service, index) => (
                <div 
                    key={service.id} 
                    className="group relative p-6 md:p-8 transition-all duration-300 hover:bg-zinc-900/30 border border-zinc-900 md:border-none"
                >
                    {/* Hover Top Border Beam - RED ACCENT */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    
                    {/* Meta Data */}
                    <div className="flex justify-between items-start mb-8 opacity-60 text-[10px] uppercase tracking-wider font-mono">
                        <span className="border border-zinc-700 px-2 py-1 rounded-full group-hover:border-accent group-hover:text-accent transition-colors">0{index + 1}</span>
                        <span>Design Service</span>
                    </div>

                    {/* Image Area */}
                    <div className="aspect-[4/3] w-full mb-8 overflow-hidden bg-zinc-900 relative border border-zinc-800">
                         <img 
                            src={getMainProjectImage(service.categoryFilter)} 
                            alt={service.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-100 grayscale group-hover:grayscale-0" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                    </div>

                    {/* Content */}
                    <h3 className="font-display text-2xl font-bold text-white mb-4 group-hover:text-zinc-200">
                        {service.title.split(' ').map((word, i) => (
                            <span key={i} className="block">{word}</span>
                        ))}
                    </h3>
                    
                    <p className="text-zinc-500 text-sm leading-relaxed mb-6 group-hover:text-zinc-400 transition-colors">
                        {service.description}
                    </p>

                    <button 
                        onClick={() => navigateToCategory(service.categoryFilter)}
                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 group-hover:text-accent"
                    >
                        View Projects <ArrowRight className="w-3 h-3" />
                    </button>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Services;