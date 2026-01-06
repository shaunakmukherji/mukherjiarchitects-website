# Main Commands for Website

## Development
- `npm run dev` - Start development server (auto-regenerates projects on file changes)

## Regenerate Projects
- `npm run generate` - Regenerate projects data from `/public/images/projects` folder

## Build
- `npm run build` - Build for production (auto-runs generate first)
- `npm run preview` - Preview production build

## Project Structure
- Projects are in `/public/images/projects/` organized by category folders
- Each project folder should have: `description.md`, `render-01.png` (main image), and optional gallery images
- Generated data goes to `/generated/projects.ts` and `/generated/services.ts`
















