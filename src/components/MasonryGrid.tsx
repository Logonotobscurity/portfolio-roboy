import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Add debounce utility
function debounce<T extends (...args: any[]) => any>(
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
      const element = gridRef.current;
      if (!element) return;

      const width = element.clientWidth;
      if (width < 640) setColumns(1);
      else if (width < 1024) setColumns(2);
      else setColumns(3);
    }

    const debouncedUpdateColumns = debounce(updateColumns, 250);

    updateColumns(); // Initial call
    window.addEventListener('resize', debouncedUpdateColumns);
    return () => window.removeEventListener('resize', debouncedUpdateColumns);
  }, []);

  const getColumns = () => {
    const cols: ImageData[][] = Array.from({ length: columns }, () => []);
    images.forEach((image, i) => {
      cols[i % columns].push(image);
    });
    return cols;
  };

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4"
    >
      {getColumns().map((column, colIndex) => (
        <div key={colIndex} className="flex flex-col gap-4">
          {column.map((image, imageIndex) => (
            <motion.div
              key={`${colIndex}-${imageIndex}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: (colIndex * column.length + imageIndex) * 0.1 }}
              className="relative group"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="relative overflow-hidden rounded-lg aspect-[3/4]"
                onClick={() => onImageClick(image)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    grayscaleImages.includes(image.src)
                      ? 'grayscale hover:grayscale-0'
                      : ''
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-bold">{image.alt}</h3>
                  {image.description && (
                    <p className="text-gray-200 text-sm mt-1">{image.description}</p>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
} 