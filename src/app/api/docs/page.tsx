const swaggerUiCss = "https://unpkg.com/swagger-ui-dist@5.17.2/swagger-ui.css";
const swaggerUiScript = "https://unpkg.com/swagger-ui-dist@5.17.2/swagger-ui-bundle.js";

export const dynamic = "force-static";

export default function DocsPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#f8fafc", padding: 24 }}>
      <div id="swagger-ui" />
      <link rel="stylesheet" href={swaggerUiCss} />
      <script src={swaggerUiScript} defer />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('load', () => {
              if (window.SwaggerUIBundle) {
                window.SwaggerUIBundle({
                  url: '/api/openapi',
                  dom_id: '#swagger-ui',
                  deepLinking: true,
                  presets: [window.SwaggerUIBundle.presets.apis],
                });
              }
            });
          `,
        }}
      />
    </main>
  );
}
