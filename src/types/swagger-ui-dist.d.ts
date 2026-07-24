declare module "swagger-ui-dist/swagger-ui-bundle.js" {
  type SwaggerUIBundleOptions = Record<string, unknown>;
  type SwaggerUIBundleFactory = (options: SwaggerUIBundleOptions) => unknown;

  const SwaggerUIBundle: SwaggerUIBundleFactory & {
    presets: {
      apis: unknown;
    };
  };

  export default SwaggerUIBundle;
}
