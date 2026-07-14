import { useEffect } from "react";
import { runTalwinder } from "talwinder-ji-ki-css";

export function useTalwinder(deps: React.DependencyList = []) {
  useEffect(() => {
    const originalQuerySelectorAll = document.querySelectorAll;

    // Temporary monkeypatch to filter out SVG elements where className is an object
    document.querySelectorAll = function (selector: string) {
      if (selector === "[class]") {
        const elements = originalQuerySelectorAll.call(document, selector);
        return Array.from(elements).filter(
          (el) => el && typeof (el as any).className === "string"
        ) as any;
      }
      return originalQuerySelectorAll.apply(document, arguments as any);
    } as any;

    try {
      runTalwinder();
    } catch (e) {
      console.error("TalwinderCSS run error:", e);
    } finally {
      // Always restore the original querySelectorAll function
      document.querySelectorAll = originalQuerySelectorAll;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
