export const slug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Folder names in the content file are stored in mixed case ("THESIS"); show them in sentence case.
export const label = (title: string) =>
  title === title.toUpperCase() && title.length > 3 ? title[0] + title.slice(1).toLowerCase() : title;
