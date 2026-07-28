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
import { Menu, X, Github, ExternalLink } from 'lucide-react';

const RootLayout = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auto-scan whenever route path changes
  useTalwinder([location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0c] text-[#f4f4f7] selection:bg-white/10 selection:text-white">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* CLI-style monospace prefix instead of animated icon */}
            <span className="font-mono text-[var(--text-muted)] text-sm select-none">//</span>
            <Link to="/" className="text-xl font-extrabold tracking-tight text-[var(--text-primary)]">
              TalwinderCSS
            </Link>
            <span className="px-2 py-0.5 text-xs font-medium rounded border bg-[#16161a] border-[#222228] text-[#5c5c6a]">
              v1.0.4
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <Link
              to="/"
              activeProps={{ className: 'text-[#f4f4f7] border-b border-[#f4f4f7] pb-0.5' }}
              inactiveProps={{ className: 'text-[#9a9aa8] hover:text-[#f4f4f7]' }}
              className="transition-colors"
            >
              Home
            </Link>
            <Link
              to="/playground"
              activeProps={{ className: 'text-[#f4f4f7] border-b border-[#f4f4f7] pb-0.5' }}
              inactiveProps={{ className: 'text-[#9a9aa8] hover:text-[#f4f4f7]' }}
              className="transition-colors"
            >
              Playground
            </Link>
            <Link
              to="/docs/$section"
              params={{ section: 'getting-started' }}
              activeProps={{ className: 'text-[#f4f4f7] border-b border-[#f4f4f7] pb-0.5' }}
              inactiveProps={{ className: 'text-[#9a9aa8] hover:text-[#f4f4f7]' }}
              className="transition-colors"
            >
              Docs
            </Link>
            <a
              href="https://github.com/MEHULARORA11/My-Custom-Tailwind"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9a9aa8] hover:text-[#f4f4f7] transition-colors flex items-center space-x-1"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#9a9aa8] hover:text-white p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-2 pb-4 space-y-2 border-t border-[#222228] bg-[#0a0a0c]">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-[#9a9aa8] hover:text-white hover:bg-[#16161a]"
              activeProps={{ className: 'bg-[#16161a] text-[#f4f4f7]' }}
            >
              Home
            </Link>
            <Link
              to="/playground"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-[#9a9aa8] hover:text-white hover:bg-[#16161a]"
              activeProps={{ className: 'bg-[#16161a] text-[#f4f4f7]' }}
            >
              Playground
            </Link>
            <Link
              to="/docs/$section"
              params={{ section: 'getting-started' }}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-[#9a9aa8] hover:text-white hover:bg-[#16161a]"
              activeProps={{ className: 'bg-[#16161a] text-[#f4f4f7]' }}
            >
              Docs
            </Link>
            <a
              href="https://github.com/MEHULARORA11/My-Custom-Tailwind"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 rounded-md text-base font-medium text-[#9a9aa8] hover:text-white hover:bg-[#16161a] flex items-center space-x-2"
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
      <footer className="border-t border-[#222228] bg-[#0a0a0c] py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-[#5c5c6a]">
          <div>
            <p>TalwinderCSS Showcase &copy; {new Date().getFullYear()}. Crafted for utility supremacy.</p>
            <p className="mt-1 text-xs">
              Demonstrating the{' '}
              <code className="bg-[#121216] text-[#9a9aa8] font-mono px-1.5 py-0.5 rounded border border-[#222228] text-xs">
                talwinder-ji-ki-css
              </code>{' '}
              engine.
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/MEHULARORA11/My-Custom-Tailwind"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#f4f4f7] transition-colors flex items-center space-x-1"
            >
              <span>Engine Source</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href="https://www.npmjs.com/package/talwinder-ji-ki-css"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#f4f4f7] transition-colors flex items-center space-x-1"
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
