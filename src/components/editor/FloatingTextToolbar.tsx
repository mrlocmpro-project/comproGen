import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Bold, Italic, Underline, Minus, Plus, Highlighter, Undo, Eraser } from 'lucide-react';

interface FloatingTextToolbarProps {
  /** Optional container element or query selector to limit selection detection */
  targetContainerSelector?: string;
  /** Whether direct in-place editing is enabled on document text */
  directEditEnabled?: boolean;
}

export const FloatingTextToolbar: React.FC<FloatingTextToolbarProps> = ({
  targetContainerSelector = '.spread-viewport-canvas',
  directEditEnabled = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number; placement: 'top' | 'bottom' }>({
    top: 0,
    left: 0,
    placement: 'top',
  });
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [fontSize, setFontSize] = useState<number>(16);
  const [inputFontSize, setInputFontSize] = useState<string>('16');

  const toolbarRef = useRef<HTMLDivElement>(null);

  // Synchronize contentEditable attributes on target document text elements
  useEffect(() => {
    if (!directEditEnabled) return;

    const applyContentEditable = () => {
      const container = document.querySelector(targetContainerSelector);
      if (!container) return;

      // Select primary textual blocks in the spreads
      const textElements = container.querySelectorAll<HTMLElement>(
        'h1, h2, h3, h4, h5, h6, p, td, th, blockquote, .editable-text, [data-editable="true"]'
      );

      textElements.forEach((el) => {
        // Protect non-content elements like crop marks, grid overlay, or print-hidden containers
        if (el.closest('.crop-marks, .grid-overlay, .no-print, nav, button')) return;

        // Avoid nested contenteditable if a parent is already contenteditable
        const parentEditable = el.parentElement?.closest('[contenteditable="true"]');
        if (parentEditable && parentEditable !== el) {
          el.removeAttribute('contenteditable');
          return;
        }

        if (el.getAttribute('contenteditable') !== 'true') {
          el.setAttribute('contenteditable', 'true');
          el.setAttribute('spellcheck', 'false');
          el.setAttribute('suppresscontenteditablewarning', 'true');
        }
      });
    };

    applyContentEditable();

    // Use MutationObserver so that theme switches, tab changes, or dynamic reflow preserve contentEditable
    const observer = new MutationObserver(() => {
      applyContentEditable();
    });

    const targetEl = document.querySelector(targetContainerSelector);
    if (targetEl) {
      observer.observe(targetEl, { childList: true, subtree: true });
    }

    return () => {
      observer.disconnect();
    };
  }, [targetContainerSelector, directEditEnabled]);

  // Read current computed font size and formatting from selection
  const updateFormattingState = useCallback((range: Range) => {
    try {
      setIsBold(document.queryCommandState('bold'));
      setIsItalic(document.queryCommandState('italic'));
      setIsUnderline(document.queryCommandState('underline'));

      let targetEl = range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE
        ? (range.commonAncestorContainer as HTMLElement)
        : range.commonAncestorContainer.parentElement;

      if (targetEl) {
        // Check for inline fontSize on target or parent span
        const computed = window.getComputedStyle(targetEl);
        const parsed = parseFloat(computed.fontSize);
        if (!isNaN(parsed) && parsed > 0) {
          const rounded = Math.round(parsed);
          setFontSize(rounded);
          setInputFontSize(String(rounded));
        }
      }
    } catch {
      // Ignore security or queryCommandState failures in non-editable nodes
    }
  }, []);

  // Update toolbar position based on window.getSelection()
  const handleSelection = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || selection.rangeCount === 0) {
      setIsVisible(false);
      return;
    }

    const text = selection.toString().trim();
    if (text.length === 0) {
      setIsVisible(false);
      return;
    }

    const anchor = selection.anchorNode;
    const element = anchor?.nodeType === Node.ELEMENT_NODE ? (anchor as HTMLElement) : anchor?.parentElement;
    if (!element) {
      setIsVisible(false);
      return;
    }

    // Must be inside the monograph A4 canvas or contentEditable area
    const insideDoc = element.closest('.sheet-page, .page-spread, [contenteditable="true"]');
    if (!insideDoc) {
      setIsVisible(false);
      return;
    }

    // Ignore selections inside UI controls, top nav, or editor panel
    if (element.closest('.editor-panel, header.no-print, .doc-info-bar')) {
      setIsVisible(false);
      return;
    }

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) {
      setIsVisible(false);
      return;
    }

    updateFormattingState(range);

    // Compute toolbar positioning
    const toolbarWidth = 350;
    const toolbarHeight = 44;

    let top = rect.top - toolbarHeight - 12;
    let placement: 'top' | 'bottom' = 'top';

    // If too close to the top navigation bar (height 56px + margin), place below the selection
    if (top < 68) {
      top = rect.bottom + 12;
      placement = 'bottom';
    }

    let left = rect.left + rect.width / 2;
    // Keep toolbar comfortably within screen horizontal bounds
    left = Math.max(toolbarWidth / 2 + 16, Math.min(window.innerWidth - toolbarWidth / 2 - 16, left));

    setCoords({ top, left, placement });
    setIsVisible(true);
  }, [updateFormattingState]);

  // Global listeners for selection and repositioning
  useEffect(() => {
    const onSelectionChange = () => {
      // Small timeout to allow mouseup or touch to finalize selection coordinates
      setTimeout(handleSelection, 10);
    };

    const onScrollOrResize = () => {
      if (isVisible) {
        handleSelection();
      }
    };

    const onMouseDownDoc = (e: MouseEvent) => {
      // If clicking inside the toolbar, don't dismiss
      if (toolbarRef.current && toolbarRef.current.contains(e.target as Node)) {
        return;
      }
      // If clicking outside an active selection, dismiss
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        setIsVisible(false);
      }
    };

    document.addEventListener('selectionchange', onSelectionChange);
    document.addEventListener('mouseup', onSelectionChange);
    document.addEventListener('keyup', onSelectionChange);
    window.addEventListener('scroll', onScrollOrResize, true);
    window.addEventListener('resize', onScrollOrResize);
    document.addEventListener('mousedown', onMouseDownDoc);

    return () => {
      document.removeEventListener('selectionchange', onSelectionChange);
      document.removeEventListener('mouseup', onSelectionChange);
      document.removeEventListener('keyup', onSelectionChange);
      window.removeEventListener('scroll', onScrollOrResize, true);
      window.removeEventListener('resize', onScrollOrResize);
      document.removeEventListener('mousedown', onMouseDownDoc);
    };
  }, [handleSelection, isVisible]);

  // Apply formatting commands (Bold, Italic, Underline)
  const executeCommand = (command: string) => {
    document.execCommand(command, false);
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      updateFormattingState(sel.getRangeAt(0));
    }
  };

  // Apply custom font size (in px) to the selected range
  const applyFontSize = (newSize: number) => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);

    const safeSize = Math.max(8, Math.min(120, newSize));

    // If selected text already belongs to an existing custom styled span
    const parent = range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE
      ? (range.commonAncestorContainer as HTMLElement)
      : range.commonAncestorContainer.parentElement;

    if (parent && parent.tagName === 'SPAN' && parent.style.fontSize && sel.toString() === parent.textContent) {
      parent.style.fontSize = `${safeSize}px`;
      setFontSize(safeSize);
      setInputFontSize(String(safeSize));
      return;
    }

    try {
      const span = document.createElement('span');
      span.style.fontSize = `${safeSize}px`;
      span.className = 'custom-styled-text';

      const contents = range.extractContents();
      span.appendChild(contents);
      range.insertNode(span);

      // Re-select newly created span so subsequent clicks increment/decrement smoothly
      const newRange = document.createRange();
      newRange.selectNodeContents(span);
      sel.removeAllRanges();
      sel.addRange(newRange);

      setFontSize(safeSize);
      setInputFontSize(String(safeSize));
    } catch {
      // Fallback
    }
  };

  // Step font size up or down
  const handleStepFontSize = (delta: number) => {
    applyFontSize(fontSize + delta);
  };

  // Toggle Highlight color
  const handleToggleHighlight = () => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);

    const parent = range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE
      ? (range.commonAncestorContainer as HTMLElement)
      : range.commonAncestorContainer.parentElement;

    if (parent && parent.tagName === 'MARK') {
      const textNode = document.createTextNode(parent.textContent || '');
      parent.parentNode?.replaceChild(textNode, parent);
    } else {
      const mark = document.createElement('mark');
      mark.className = 'bg-amber-300 text-zinc-900 px-1 py-0.5 rounded-xs font-semibold';
      try {
        const contents = range.extractContents();
        mark.appendChild(contents);
        range.insertNode(mark);

        const newRange = document.createRange();
        newRange.selectNodeContents(mark);
        sel.removeAllRanges();
        sel.addRange(newRange);
      } catch {
        document.execCommand('hiliteColor', false, '#fcd34d');
      }
    }
  };

  // Undo last action on editable content
  const handleUndo = () => {
    document.execCommand('undo', false);
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      updateFormattingState(sel.getRangeAt(0));
    }
  };

  // Reset format to default theme: remove inline styles, custom spans, b/strong, marks
  const handleResetFormat = () => {
    document.execCommand('removeFormat', false);
    setIsBold(false);
    setIsItalic(false);
    setIsUnderline(false);

    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);

      const cleanNode = (node: Node | null) => {
        if (!node) return;
        if (node.nodeType === Node.ELEMENT_NODE) {
          const el = node as HTMLElement;
          if (el.tagName === 'SPAN' && (el.style.fontSize || el.classList.contains('custom-styled-text'))) {
            el.removeAttribute('style');
            el.classList.remove('custom-styled-text');
          }
          if (el.tagName === 'MARK') {
            const parent = el.parentNode;
            while (el.firstChild) {
              parent?.insertBefore(el.firstChild, el);
            }
            parent?.removeChild(el);
          }
        }
      };

      const parent = range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE
        ? (range.commonAncestorContainer as HTMLElement)
        : range.commonAncestorContainer.parentElement;

      cleanNode(parent);
      cleanNode(parent?.parentElement || null);

      if (parent) {
        // Also clean any children intersecting range
        const styledElements = parent.querySelectorAll('span[style], mark, .custom-styled-text, b, strong, i, em, u');
        styledElements.forEach((el) => {
          try {
            if (range.intersectsNode(el)) {
              cleanNode(el);
              if (el.tagName === 'B' || el.tagName === 'STRONG' || el.tagName === 'I' || el.tagName === 'EM' || el.tagName === 'U') {
                const p = el.parentNode;
                while (el.firstChild) {
                  p?.insertBefore(el.firstChild, el);
                }
                p?.removeChild(el);
              }
            }
          } catch {
            // ignore range intersection quirks
          }
        });

        const computed = window.getComputedStyle(parent);
        const parsed = parseFloat(computed.fontSize);
        if (!isNaN(parsed) && parsed > 0) {
          setFontSize(Math.round(parsed));
          setInputFontSize(String(Math.round(parsed)));
        }
      }
      updateFormattingState(range);
    }
  };

  return (
    <div
      id="floating-toolbar"
      ref={toolbarRef}
      onMouseDown={(e) => {
        // Prevent clicking the toolbar from stealing focus and collapsing the text selection
        e.preventDefault();
      }}
      style={{
        position: 'fixed',
        top: `${coords.top}px`,
        left: `${coords.left}px`,
        transform: 'translateX(-50%)',
      }}
      className={`no-print z-50 transition-all duration-200 ease-out select-none ${
        isVisible
          ? 'opacity-100 scale-100 pointer-events-auto translate-y-0'
          : 'opacity-0 scale-95 pointer-events-none -translate-y-1'
      }`}
    >
      <div className="relative bg-[#18181b]/95 backdrop-blur-md text-zinc-100 border border-zinc-700/70 rounded-xl shadow-2xl px-2.5 py-1.5 flex items-center gap-1.5 font-sans text-xs">
        {/* Pointer indicator arrow */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#18181b] border-zinc-700/70 rotate-45 pointer-events-none ${
            coords.placement === 'top'
              ? '-bottom-1.5 border-b border-r'
              : '-top-1.5 border-t border-l'
          }`}
        />

        {/* Format Action: Bold */}
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => executeCommand('bold')}
          title="Tebal (Bold) [Ctrl+B]"
          className={`p-1.5 rounded-lg transition-colors flex items-center justify-center ${
            isBold
              ? 'bg-amber-500 text-zinc-950 font-bold shadow-xs'
              : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
          }`}
        >
          <Bold className="w-3.5 h-3.5" />
        </button>

        {/* Format Action: Italic */}
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => executeCommand('italic')}
          title="Miring (Italic) [Ctrl+I]"
          className={`p-1.5 rounded-lg transition-colors flex items-center justify-center ${
            isItalic
              ? 'bg-amber-500 text-zinc-950 font-bold shadow-xs'
              : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
          }`}
        >
          <Italic className="w-3.5 h-3.5" />
        </button>

        {/* Format Action: Underline */}
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => executeCommand('underline')}
          title="Garis Bawah (Underline) [Ctrl+U]"
          className={`p-1.5 rounded-lg transition-colors flex items-center justify-center ${
            isUnderline
              ? 'bg-amber-500 text-zinc-950 font-bold shadow-xs'
              : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
          }`}
        >
          <Underline className="w-3.5 h-3.5" />
        </button>

        {/* Divider */}
        <div className="w-[1px] h-4 bg-zinc-700 mx-0.5" />

        {/* Font Size Stepper */}
        <div className="flex items-center gap-1 bg-zinc-800/80 rounded-lg p-0.5 border border-zinc-700/60">
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => handleStepFontSize(-1)}
            title="Kecilkan Font (-1px)"
            className="p-1 rounded-md text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors"
          >
            <Minus className="w-3 h-3" />
          </button>

          <div className="flex items-center px-1">
            <input
              type="text"
              value={inputFontSize}
              onMouseDown={(e) => e.stopPropagation()}
              onChange={(e) => {
                setInputFontSize(e.target.value);
                const val = parseInt(e.target.value, 10);
                if (!isNaN(val) && val >= 8 && val <= 120) {
                  applyFontSize(val);
                }
              }}
              onBlur={() => setInputFontSize(String(fontSize))}
              className="w-7 text-center font-bold text-xs bg-transparent text-amber-400 focus:outline-none"
              title="Ketik Ukuran Font (px)"
            />
            <span className="text-[10px] text-zinc-400 select-none">px</span>
          </div>

          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => handleStepFontSize(1)}
            title="Besarkan Font (+1px)"
            className="p-1 rounded-md text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>

        {/* Divider */}
        <div className="w-[1px] h-4 bg-zinc-700 mx-0.5" />

        {/* Format Action: Highlighter */}
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={handleToggleHighlight}
          title="Beri Warna Sorotan (Highlight)"
          className="p-1.5 rounded-lg text-zinc-300 hover:text-amber-400 hover:bg-zinc-800 transition-colors flex items-center justify-center"
        >
          <Highlighter className="w-3.5 h-3.5 text-amber-400" />
        </button>

        {/* Divider before Undo & Reset */}
        <div className="w-[1px] h-4 bg-zinc-700 mx-0.5" />

        {/* Action: Undo */}
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={handleUndo}
          title="Undo (Ctrl+Z)"
          className="p-1.5 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors flex items-center justify-center"
        >
          <Undo className="w-3.5 h-3.5" />
        </button>

        {/* Action: Reset ke Format Default */}
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={handleResetFormat}
          title="Reset ke Format Default"
          className="p-1.5 rounded-lg text-zinc-300 hover:text-amber-400 hover:bg-zinc-800 transition-colors flex items-center justify-center"
        >
          <Eraser className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
