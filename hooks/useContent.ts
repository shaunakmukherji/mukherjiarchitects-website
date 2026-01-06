// Custom hook for fetching content from database
// Falls back to constants.ts if database is not configured

import { useState, useEffect } from 'react';
import { ABOUT_CONTENT, PROJECTS, SERVICES } from '../constants';
import { fetchAboutContent as fetchAboutFromSupabase, fetchProjects as fetchProjectsFromSupabase, fetchServices as fetchServicesFromSupabase } from '../lib/supabase';
// Uncomment if using Firebase:
// import { fetchAboutContent as fetchAboutFromFirebase, fetchProjects as fetchProjectsFromFirebase, fetchServices as fetchServicesFromFirebase } from '../lib/firebase';

export const useContent = () => {
  const [aboutContent, setAboutContent] = useState(ABOUT_CONTENT);
  const [projects, setProjects] = useState(PROJECTS);
  const [services, setServices] = useState(SERVICES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        // Try to fetch from Supabase first
        const aboutData = await fetchAboutFromSupabase();
        const projectsData = await fetchProjectsFromSupabase();
        const servicesData = await fetchServicesFromSupabase();

        // If data exists from database, use it; otherwise use constants
        if (aboutData) {
          setAboutContent({
            imageUrl: aboutData.image_url,
            imageAlt: aboutData.image_alt,
            heading: aboutData.heading,
            headingHighlight: aboutData.heading_highlight,
            description: aboutData.description,
            philosophy: aboutData.philosophy
          });
        }

        if (projectsData) {
          setProjects(projectsData.map((p: any) => ({
            id: p.id,
            title: p.title,
            category: p.category,
            year: p.year,
            location: p.location,
            description: p.description,
            imageUrl: p.image_url,
            gallery: p.gallery || []
          })));
        }

        if (servicesData) {
          setServices(servicesData.map((s: any) => ({
            id: s.id,
            title: s.title,
            description: s.description,
            imageUrl: s.image_url,
            categoryFilter: s.category_filter
          })));
        }
      } catch (error) {
        console.error('Error loading content:', error);
        // Fallback to constants is already set as default
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  return { aboutContent, projects, services, loading };
};



















