import React, { useCallback, useEffect, useRef, useState } from 'react';

/** Visible dot diameter (px); ~12–16px is a common readable range for custom cursors. */
const DIAMETER = 14;
const HOVER_SCALE = 1.42;
const ACCENT = '#DC2626';

const TEXT_FIELD_SELECTOR =
  'input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]):not([type="file"]):not([type="hidden"]), textarea, [contenteditable="true"]';

const CLICKABLE_SELECTOR =
  'a[href], button, [role="button"], input[type="submit"], input[type="button"], input[type="reset"], label[for], select, summary, .cursor-pointer';

function isTextFieldUnder(el: Element | null): boolean {
  if (!el) return false;
  const node = el.closest(TEXT_FIELD_SELECTOR);
  if (!node) return false;
  if (node instanceof HTMLInputElement) {
    const t = node.type;
    return !['button', 'submit', 'reset', 'checkbox', 'radio', 'file', 'hidden'].includes(t);
  }
  return true;
}

function isClickableUnder(el: Element | null): boolean {
  if (!el || isTextFieldUnder(el)) return false;
  const node = el.closest<HTMLElement>(CLICKABLE_SELECTOR);
  if (!node) return false;
  if ('disabled' in node && (node as HTMLButtonElement | HTMLInputElement).disabled) return false;
  if (node.getAttribute('aria-disabled') === 'true') return false;
  return true;
}

/**
 * Fine-pointer-only custom dot: hides the system cursor, follows the pointer with rAF,
 * scales slightly over click targets. Text fields hide the dot and restore the I-beam.
 */
const CustomCursor: React.FC = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  const [enabled, setEnabled] = useState(false);
  const hasMovedRef = useRef(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [overClickable, setOverClickable] = useState(false);
  const [overTextField, setOverTextField] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const flushPosition = useCallback(() => {
    const el = outerRef.current;
    if (!el) return;
    const r = DIAMETER / 2;
    const { x, y } = posRef.current;
    el.style.transform = `translate3d(${x - r}px, ${y - r}px, 0)`;
  }, []);

  useEffect(() => {
    const fineMq = window.matchMedia('(pointer: fine)');
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)');

    const sync = () => {
      setEnabled(fineMq.matches);
      setReduceMotion(motionMq.matches);
    };
    sync();
    fineMq.addEventListener('change', sync);
    motionMq.addEventListener('change', sync);
    return () => {
      fineMq.removeEventListener('change', sync);
      motionMq.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;
    root.classList.add('has-custom-cursor');

    const schedulePosition = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        flushPosition();
      });
    };

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      schedulePosition();
      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        setHasMoved(true);
      }

      const target = document.elementFromPoint(e.clientX, e.clientY);
      setOverTextField(isTextFieldUnder(target));
      setOverClickable(isClickableUnder(target));
    };

    const onLeave = () => {
      hasMovedRef.current = false;
      setHasMoved(false);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      root.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled, flushPosition]);

  if (!enabled) return null;

  const motionMs = reduceMotion ? 0 : 160;
  const hidden = !hasMoved || overTextField;

  return (
    <div
      ref={outerRef}
      className="pointer-events-none fixed left-0 top-0 z-[100]"
      style={{ willChange: 'transform' }}
      aria-hidden
    >
      <div
        className="rounded-full"
        style={{
          width: DIAMETER,
          height: DIAMETER,
          backgroundColor: ACCENT,
          opacity: hidden ? 0 : 1,
          transform: `scale(${overClickable ? HOVER_SCALE : 1})`,
          transition: motionMs
            ? `transform ${motionMs}ms cubic-bezier(0.25, 0.1, 0.25, 1), opacity ${motionMs * 0.75}ms ease`
            : 'none',
        }}
      />
    </div>
  );
};

export default CustomCursor;
