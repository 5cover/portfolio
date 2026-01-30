export {};

declare global {
    interface Window {
        refreshDefTooltips?: (root?: ParentNode) => void;
    }
}
