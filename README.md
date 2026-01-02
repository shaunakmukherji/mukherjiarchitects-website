# Mukherji Architects Milano

A modern, responsive architecture portfolio website showcasing intelligent design and technology-driven architectural solutions.

## Features

- **Modern UI/UX**: Clean, minimalist design with smooth animations and transitions
- **Portfolio Showcase**: Dynamic project galleries with category filtering
- **Responsive Design**: Fully responsive across all devices
- **Performance Optimized**: Fast loading times with optimized images
- **Smooth Navigation**: Seamless scrolling and view transitions

## Tech Stack

- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
Website/
├── components/          # React components
│   ├── Layout/        # Layout components (Navbar, Footer)
│   ├── Sections/      # Page sections (Hero, About, Services, etc.)
│   ├── Views/         # View components (ProjectDetail, CategoryListing)
│   └── ui/            # Reusable UI components
├── contexts/          # React contexts
├── hooks/             # Custom React hooks
├── lib/               # Library configurations (Firebase, Supabase)
├── public/            # Static assets
│   └── images/        # Image assets
└── constants.ts       # App constants and configuration
```

## Configuration

### Images

Place your images in the following directories:
- Hero image: `public/images/hero/hero-cover.jpg.jpeg`
- Logo: `public/images/logo/logo.png`
- About image: `public/images/about/about-hero.jpg`
- Project images: `public/images/projects/`
- Service images: `public/images/services/`

### Content

Edit `constants.ts` to update:
- Navigation items
- About content
- Services
- Projects

## Build for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

## Preview Production Build

```bash
npm run preview
```

## License

Private project - All rights reserved
