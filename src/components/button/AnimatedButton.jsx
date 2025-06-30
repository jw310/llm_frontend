import { cn } from '@/utils/clsx';

function AnimatedButton() {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div>
      <div className={cn('home-txt-buttons flex')}>
        <button
          onClick={handleClick}
          className={cn(
            "animation-gloss orange-shadow relative mr-[20px] flex h-[44px] w-[140px] items-center justify-center overflow-hidden rounded bg-gradient-to-b from-orange-500 to-red-600 text-[14px] text-white uppercase before:absolute before:top-0 before:left-0 before:h-full before:w-1/2 before:translate-x-[160px] before:skew-x-[45deg] before:bg-white/50 before:content-[''] hover:from-red-600 hover:to-orange-500"
          )}
        >
          Button
        </button>
      </div>
    </div>
  );
}

export default AnimatedButton;
