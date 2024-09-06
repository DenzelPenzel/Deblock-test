import { cn } from '../../styles/theme';
import { ToggleSvg } from '../../svg/ToggleSvg';
import type { SwapToggleButtonReact } from '../../types';
import { useSwapContext } from './SwapProvider';

export function SwapToggleButton({ className }: SwapToggleButtonReact) {
  const { handleToggle } = useSwapContext();
  return (
    <button
      type="button"
      className={cn(
        '-translate-x-2/4 -translate-y-2/4 absolute top-2/4 left-2/4',
        'flex h-[56px] w-[56px] z-10',
        className,
      )}
      data-testid="SwapTokensButton"
      onClick={handleToggle}
    >
      {ToggleSvg}
    </button>
  );
}
