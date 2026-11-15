// Shared, mutable seam position (0..1 = share of the viewport the tech side takes).
// Kept outside React so dragging never re-renders; the DOM reads it through the --p
// CSS variable and the 3D scenes read it every frame.
export const SEAM_MIN = 0.28;
export const SEAM_MAX = 0.72;

export const seam = { p: 0.5 };

export const clampSeam = (p: number) => Math.min(SEAM_MAX, Math.max(SEAM_MIN, p));
