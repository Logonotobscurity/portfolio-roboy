import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import type { HTMLMotionProps, MotionStyle, Transition, Variants } from 'framer-motion';
import { createContext, useContext, useId, useRef, useState, useMemo } from 'react';
import type { ReactNode, RefObject } from 'react';
import { cn } from '@/lib/utils';
import { XIcon } from 'lucide-react';

interface DialogContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  uniqueId: string;
  triggerRef: RefObject<HTMLDivElement>;
}

interface DialogProviderProps {
  children: ReactNode;
  transition?: Transition;
}

interface DialogTriggerProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  children: ReactNode;
}

interface DialogContentProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  children: ReactNode;
}

interface DialogContainerProps {
  children: ReactNode;
  className?: string;
}

interface DialogTitleProps {
  children: ReactNode;
  className?: string;
}

interface DialogDescriptionProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
}

interface DialogImageProps {
  src: string;
  alt: string;
  className?: string;
}

interface DialogCloseProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
}

const DialogContext = createContext<DialogContextType | null>(null);

function useDialogContext() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
}

function DialogProvider({ children, transition }: DialogProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const uniqueId = useId();
  const triggerRef = useRef<HTMLDivElement>(null);

  const contextValue = useMemo(
    () => ({ isOpen, setIsOpen, uniqueId, triggerRef }),
    [isOpen, uniqueId]
  );

  return (
    <DialogContext.Provider value={contextValue}>
      <MotionConfig transition={transition ?? defaultTransition}>
        {children}
      </MotionConfig>
    </DialogContext.Provider>
  );
}

const defaultTransition: Transition = {
  type: 'spring',
  duration: 0.3,
  bounce: 0.2,
};

function DialogTrigger({ children, ...props }: DialogTriggerProps) {
  const { isOpen, setIsOpen, uniqueId, triggerRef } = useDialogContext();

  return (
    <motion.div
      ref={triggerRef}
      layoutId={uniqueId}
      className={cn('cursor-pointer', props.className)}
      onClick={() => setIsOpen(true)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          setIsOpen(true);
        }
      }}
      tabIndex={0}
      role="button"
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      aria-controls={`dialog-${uniqueId}`}
      style={props.style as MotionStyle}
      {...props}
    >
      {children}
    </motion.div>
  );
}

function DialogContent({ children, ...props }: DialogContentProps) {
  const { isOpen, setIsOpen, uniqueId } = useDialogContext();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            layoutId={uniqueId}
            className={cn(
              'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
              props.className
            )}
            style={props.style as MotionStyle}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`dialog-title-${uniqueId}`}
            aria-describedby={`dialog-description-${uniqueId}`}
            {...props}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function DialogContainer({ children, className }: DialogContainerProps) {
  const { isOpen, setIsOpen, uniqueId } = useDialogContext();

  return (
    <AnimatePresence initial={false} mode="sync">
      {isOpen && (
        <>
          <motion.div
            key={`backdrop-${uniqueId}`}
            className="fixed inset-0 h-full z-50 w-full bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
          <div className={cn(`fixed inset-0 z-50 w-fit mx-auto`, className)}>
            {children}
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function DialogTitle({ children, className }: DialogTitleProps) {
  const { uniqueId } = useDialogContext();

  return (
    <motion.h2
      id={`dialog-title-${uniqueId}`}
      className={cn('text-lg font-semibold', className)}
    >
      {children}
    </motion.h2>
  );
}

function DialogDescription({ children, className, variants }: DialogDescriptionProps) {
  const { uniqueId } = useDialogContext();

  return (
    <motion.div
      id={`dialog-description-${uniqueId}`}
      className={cn('mt-2 text-sm text-gray-500', className)}
      {...(variants && { variants })}
    >
      {children}
    </motion.div>
  );
}

function DialogImage({ src, alt, className }: DialogImageProps) {
  const { uniqueId } = useDialogContext();

  return (
    <motion.img
      src={src}
      alt={alt}
      className={cn('w-full rounded-lg object-cover', className)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      layoutId={`dialog-img-${uniqueId}`}
    />
  );
}

function DialogClose({ children, className, variants }: DialogCloseProps) {
  const { setIsOpen } = useDialogContext();

  return (
    <motion.button
      className={cn(
        'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground',
        className
      )}
      onClick={() => setIsOpen(false)}
      {...(variants && { variants })}
    >
      {children}
    </motion.button>
  );
}

export default {
  Provider: DialogProvider,
  Trigger: DialogTrigger,
  Content: DialogContent,
  Container: DialogContainer,
  Title: DialogTitle,
  Description: DialogDescription,
  Image: DialogImage,
  Close: DialogClose
};

export {
  DialogProvider,
  DialogTrigger,
  DialogContent,
  DialogContainer,
  DialogTitle,
  DialogDescription,
  DialogImage,
  DialogClose,
}; 