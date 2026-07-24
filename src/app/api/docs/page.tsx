'use client';

import { useEffect, useRef } from "react";

import "swagger-ui-dist/swagger-ui.css";

export default function DocsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    let isMounted = true;

    void import("swagger-ui-dist/swagger-ui-bundle.js").then((module) => {
      if (!isMounted || !containerRef.current) {
        return;
      }

      const SwaggerUIBundle = module.default;

      SwaggerUIBundle({
        dom_id: "#swagger-ui",
        url: "/api/openapi",
        deepLinking: true,
        presets: [SwaggerUIBundle.presets.apis],
      });
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main style={{ minHeight: "100vh", background: "#f8fafc", padding: 24 }}>
      <div id="swagger-ui" ref={containerRef} />
    </main>
  );
}
