import { useState } from 'react';
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  Link,
  useLocation,
} from '@tanstack/react-router';
import { Home } from './routes/Home';
import { Playground } from './routes/Playground';
import { Docs } from './routes/Docs';
import { useTalwinder } from './lib/useTalwinder';
import { Menu, X, Github, ExternalLink, Flame } from 'lucide-react';

const RootLayout = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auto-scan whenever route path changes
  useTalwinder([location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0c] text-[#f4f4f7] selection:bg-[#aa3bff]/30 selection:text-white">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Flame className="h-6 w-6 text-purple-500 animate-pulse" />
            <Link to="/" className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              TalwinderCSS
            </Link>
            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-purple-950/50 border border-purple-800/30 text-purple-300">
              v1.0.4
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <Link
              to="/"
              activeProps={{ className: 'text-purple-400' }}
              inactiveProps={{ className: 'text-gray-400 hover:text-gray-200' }}
              className="transition-colors"
            >
              Home
            </Link>
            <Link
              to="/playground"
              activeProps={{ className: 'text-purple-400' }}
              inactiveProps={{ className: 'text-gray-400 hover:text-gray-200' }}
              className="transition-colors"
            >
              Playground
            </Link>
            <Link
              to="/docs/$section"
              params={{ section: 'getting-started' }}
              activeProps={{ className: 'text-purple-400' }}
              inactiveProps={{ className: 'text-gray-400 hover:text-gray-200' }}
              className="transition-colors"
            >
              Docs
            </Link>
            <a
              href="https://github.com/MEHULARORA11/My-Custom-Tailwind"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-200 transition-colors flex items-center space-x-1"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-400 hover:text-white p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-2 pb-4 space-y-2 border-t border-[#22222a] bg-[#0c0c10]/95 backdrop-blur-lg">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-[#181820]"
              activeProps={{ className: 'bg-[#181820] text-purple-400' }}
            >
              Home
            </Link>
            <Link
              to="/playground"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-[#181820]"
              activeProps={{ className: 'bg-[#181820] text-purple-400' }}
            >
              Playground
            </Link>
            <Link
              to="/docs/$section"
              params={{ section: 'getting-started' }}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-[#181820]"
              activeProps={{ className: 'bg-[#181820] text-purple-400' }}
            >
              Docs
            </Link>
            <a
              href="https://github.com/MEHULARORA11/My-Custom-Tailwind"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-[#181820] flex items-center space-x-2"
            >
              <Github className="h-5 w-5" />
              <span>GitHub</span>
            </a>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-[#22222a] bg-[#0c0c0e]/80 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-[#62627a]">
          <div>
            <p>TalwinderCSS Showcase &copy; {new Date().getFullYear()}. Crafted for utility supremacy.</p>
            <p className="mt-1 text-xs">
              Demonstrating the <code className="text-purple-400 bg-purple-950/20 px-1 py-0.5 rounded">talwinder-ji-ki-css</code> engine.
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/MEHULARORA11/My-Custom-Tailwind"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors flex items-center space-x-1"
            >
              <span>Engine Source</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href="https://www.npmjs.com/package/talwinder-ji-ki-css"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors flex items-center space-x-1"
            >
              <span>NPM Package</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const playgroundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/playground',
  component: Playground,
});

// Use a single /docs layout route and handle sections within Docs or route matching
const docsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/docs',
});

const docsSectionRoute = createRoute({
  getParentRoute: () => docsRoute,
  path: '/$section',
  component: Docs,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  playgroundRoute,
  docsRoute.addChildren([docsSectionRoute]),
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
