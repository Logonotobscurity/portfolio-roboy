declare module '*/cloudinaryAssets.json' {
  interface CloudinaryBreakpoint {
    width: number;
    height: number;
    bytes: number;
    url: string;
  }

  interface CloudinaryEager {
    width: number;
    height: number;
    url: string;
  }

  interface CloudinaryAsset {
    url: string;
    optimizedUrl: string;
    thumbnailUrl: string;
    format: string;
    width: number;
    height: number;
    bytes: number;
    breakpoints: CloudinaryBreakpoint[];
    eager: CloudinaryEager[];
  }

  const assets: Record<string, CloudinaryAsset>;
  export default assets;
} 