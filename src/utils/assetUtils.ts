/**
 * Returns the base public URL for assets based on the deployment environment
 */
export const getPublicUrl = (): string => {
  // Check if we're in GitHub Pages environment
  const isGitHubPages = import.meta.env.VITE_GITHUB_PAGES === 'true';
  return isGitHubPages ? '/portfolio-roboy' : '';
};

/**
 * Returns the correct path for an asset based on the deployment environment
 * @param path - The relative path to the asset
 * @returns The correct path with the base URL if needed
 */
export const getAssetPath = (path: string): string => {
  const baseUrl = getPublicUrl();
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${baseUrl}/${cleanPath}`;
}; 