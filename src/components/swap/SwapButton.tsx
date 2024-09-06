import { cn, color, text } from '../../styles/theme';
import type { SwapButtonReact } from '../../types';
import { useSwapContext } from './SwapProvider';

export function SwapButton({ className, disabled = false }: SwapButtonReact) {
  const { to, from, loading, isTransactionPending, handleSubmit } =
    useSwapContext();

  const isLoading =
    to.loading || from.loading || loading || isTransactionPending;

  const isDisabled =
    !from.amount ||
    !from.token ||
    !to.amount ||
    !to.token ||
    disabled ||
    isLoading;

  return (
    <button
      type="button"
      className={cn(
        'w-full rounded-md bg-[black]',
        'mt-8 px-4 py-3 font-medium text-[16px] text-black leading-[24px] cursor-pointer',
        className,
      )}
      onClick={() => handleSubmit()}
      disabled={isDisabled}
    >
      <span className={cn(text.headline, color.inverse, 'font-')}>
        Exchange BTC for EUR
      </span>
    </button>
  );
}
