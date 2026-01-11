export {};

declare global {
  interface Window {
    refreshDefinitionTooltips?: (root?: ParentNode) => void;
  }
}
