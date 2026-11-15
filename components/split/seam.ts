// Shared, mutable seam position (0..1 = share of the page the Build side takes).
// Kept outside React so dragging never re-renders: the DOM reads it through the --p
// CSS variable and the 3D scenes read it every frame.
export const seam = { p: 0.5 };
