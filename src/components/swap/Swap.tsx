import { Children, useMemo } from 'react';
import { useIsMounted } from '../../hooks/useIsMounted';
import { background, cn, text } from '../../styles/theme';
import type { SwapReact } from '../../types';
import { findComponent } from '../../utils';
import { SwapAmountInput } from './SwapAmountInput';
import { SwapButton } from './SwapButton';
import { SwapProvider } from './SwapProvider';
import { SwapToggleButton } from './SwapToggleButton';
import {SwapInfo} from "./SwapInfo";

export function Swap({
  children,
  className,
  experimental = { useAggregator: true },
  onError,
  onStatus,
  onSuccess,
  title = 'Exchange',
}: SwapReact) {
  const { inputs, toggleButton, swapButton, swapInfo } = useMemo(() => {
    const childrenArray = Children.toArray(children);
    return {
      inputs: childrenArray.filter(findComponent(SwapAmountInput)),
      toggleButton: childrenArray.find(findComponent(SwapToggleButton)),
      swapButton: childrenArray.find(findComponent(SwapButton)),
      swapInfo: childrenArray.find(findComponent(SwapInfo)),
    };
  }, [children]);

  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  return (
    <SwapProvider
      experimental={experimental}
      onError={onError}
      onStatus={onStatus}
      onSuccess={onSuccess}
    >
      <div
        className={cn(
          background.default,
          'flex w-[500px] flex-col rounded-xl px-6 pt-6 pb-4',
          className,
        )}
      >
        <div className="mb-[18px]">
          <h3 className={text.title3}>
            {title}
          </h3>
        </div>
        {inputs[0]}
        <div className="relative h-1.5">{toggleButton}</div>
        {inputs[1]}
        {swapInfo}
        {swapButton}
      </div>
    </SwapProvider>
  );
}
