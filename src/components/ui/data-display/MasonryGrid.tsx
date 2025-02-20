import { useEffect, useRef, useState } from 'react';
import { ResponsiveImage } from '@/components/ui/media/ResponsiveImage';

// Add debounce utility
function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

interface ImageData {
  src: string;
  alt: string;
  category: string;
  featured?: boolean;
  description?: string;
}

interface MasonryGridProps {
  images: ImageData[];
  onImageClick: (image: ImageData) => void;
  grayscaleImages?: string[];
}

export function MasonryGrid({ images, onImageClick, grayscaleImages = [] }: MasonryGridProps) {
  const [columns, setColumns] = useState(3);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function updateColumns() {
      const width = gridRef.current?.clientWidth ?? 0;
      if (width === 0) return;
      
      if (width < 640) setColumns(1);
      else if (width < 1024) setColumns(2);
      else setColumns(3);
    }

    const debouncedUpdateColumns = debounce(updateColumns, 250);

    updateColumns(); // Initial call
    window.addEventListener('resize', debouncedUpdateColumns);
    return () => window.removeEventListener('resize', debouncedUpdateColumns);
  }, []);

  const columnData = Array.from({ length: columns }, (_, columnIndex) => 
    images.filter((_, index) => index % columns === columnIndex)
  );

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4"
    >
      {columnData.map((column, colIndex) => (
        <div key={colIndex} className="flex flex-col gap-4">
          {column.map((image, imageIndex) => (
            <div
              key={`${colIndex}-${imageIndex}`}
              className="relative group opacity-0 animate-fadeIn"
              style={{
                animationDelay: `${(colIndex * column.length + imageIndex) * 100}ms`,
                animationFillMode: 'forwards'
              }}
            >
              <div
                className="relative overflow-hidden rounded-lg aspect-[3/4] cursor-pointer transform transition-transform duration-200 hover:scale-102"
                onClick={() => onImageClick(image)}
              >
                <ResponsiveImage
                  src={image.src}
                  alt={image.alt}
                  className={`w-full h-full transition-all duration-500 ${
                    grayscaleImages.includes(image.src)
                      ? 'grayscale hover:grayscale-0'
                      : ''
                  }`}
                  objectFit="cover"
                  loading="lazy"
                  priority={image.featured}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-bold">{image.alt}</h3>
                  {image.description && (
                    <p className="text-gray-200 text-sm mt-1">{image.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
} 