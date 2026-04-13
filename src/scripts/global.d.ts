export {};

declare global {
    // todo: eliminate this
    interface Window {
        refreshDefTooltips?: (root?: ParentNode) => void;
    }
}
