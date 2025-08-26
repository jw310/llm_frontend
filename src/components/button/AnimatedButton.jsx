import { cn } from '@/utils/clsx';

function AnimatedButton() {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div>
      <div className={cn('animate-fade-up flex')}>
        <button
          onClick={handleClick}
          className={cn(
            'relative flex h-10 w-fit cursor-pointer items-center justify-center overflow-hidden rounded bg-gradient-to-b from-orange-500 to-red-600 px-5 py-2 text-base text-white uppercase hover:from-red-600 hover:to-orange-500',
            "before:absolute before:top-0 before:left-0 before:h-full before:w-1/2 before:translate-x-[160px] before:skew-x-[45deg] before:bg-white/50 before:content-['']",
            'shadow-[2px_5px_10px_rgba(255,153, 132, 0.5)] before:animate-gloss transition-all duration-200'
          )}
        >
          Button
        </button>
      </div>
    </div>
  );
}

export default AnimatedButton;
