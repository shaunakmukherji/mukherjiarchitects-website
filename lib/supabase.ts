// Supabase client setup
// Install: npm install @supabase/supabase-js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not set. Using fallback data.');
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Database functions
export const fetchAboutContent = async () => {
  if (!supabase) return null;
  
  const { data, error } = await supabase
    .from('about_content')
    .select('*')
    .single();
  
  if (error) {
    console.error('Error fetching about content:', error);
    return null;
  }
  
  return data;
};

export const fetchProjects = async () => {
  if (!supabase) return null;
  
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching projects:', error);
    return null;
  }
  
  return data;
};

export const fetchServices = async () => {
  if (!supabase) return null;
  
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('created_at', { ascending: true });
  
  if (error) {
    console.error('Error fetching services:', error);
    return null;
  }
  
  return data;
};




















