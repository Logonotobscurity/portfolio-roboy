/**
 * Utility function to get the correct asset path based on the deployment environment
 * @param path - The relative path to the asset
 * @returns The correct path for the current environment
 */
export const getAssetPath = (path: string): string => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Check if we're in GitHub Pages environment
  const isGitHubPages = import.meta.env.GITHUB_PAGES === 'true';
  
  // If GitHub Pages, prepend the repo name
  if (isGitHubPages) {
    return `/portfolioRoboy/${cleanPath}`;
  }
  
  // For other environments, just return the path with leading slash
  return `/${cleanPath}`;
};

/**
 * Utility function to get the correct public URL for assets
 * @returns The base public URL for assets
 */
export const getPublicUrl = (): string => {
  return import.meta.env.GITHUB_PAGES === 'true' ? '/portfolioRoboy' : '';
}; 