import React from 'react';

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;      // real destination URL, so search engines can discover and follow it
  onNavigate: () => void; // the existing SPA navigation call (pushes state, no full reload)
}

/**
 * Renders a real <a href> instead of a <div>/<button> with only an onClick — Google
 * (and any crawler) discovers new pages primarily by following links found while
 * crawling, not just from the sitemap. A click-only element is invisible to that.
 * Also restores normal browser behavior for free: middle-click / cmd-click opens in
 * a new tab, right-click gives "copy link", hover shows the URL.
 *
 * Forwards its ref (as HTMLAnchorElement) since some callers track these elements
 * for scroll-based effects, same as they did when the element was a plain <div>.
 */
const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ href, onNavigate, onClick, children, ...rest }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      if (e.defaultPrevented) return;
      // Let the browser handle new-tab/new-window gestures natively
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      onNavigate();
    };

    return (
      <a ref={ref} href={href} onClick={handleClick} {...rest}>
        {children}
      </a>
    );
  }
);
NavLink.displayName = 'NavLink';

export default NavLink;
