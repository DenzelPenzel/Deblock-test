import {memo} from 'react';
import {cn, color, text} from '../styles/theme';
import type {TokenRowReact} from '../types';
import {formatAmount} from '../utils';
import {Image} from './Image';

export const Row = memo(function TokenRow({
                                                 className,
                                                 token,
                                                 amount,
                                                 onClick,
                                                 hideImage,
                                                 hideSymbol,
                                               }: TokenRowReact) {
  return (
    <button
      type="button"
      className={cn(
        'flex w-full h-[72px] items-center justify-between p-2 px-4 gap-2 border border-[#D9DCE1] rounded-lg mb-4 hover:border-2 hover:border-black hover:rounded-lg',
        className,
      )}
      onClick={() => onClick?.(token)}
    >
      <div className="flex w-full">
        <div className="flex w-full items-center">
          {!hideImage && <Image token={token} size={32}/>}
          <div className="flex w-full flex-col items-start ml-4">
            <div className="flex w-full justify-between">
              <span className={cn(text.label1, 'text-[16px] leading-[24px]')}>
                {token.name}
              </span>
              <span className={cn(text.label1, 'text-[16px] leading-[24px]')}>
                0,04
              </span>
            </div>
            {!hideSymbol && (
              <span className={cn(text.label2, 'text-[#848D9C]')}>
                {token.symbol}
              </span>
            )}
          </div>
        </div>
      </div>
      <span
        className={cn(text.body, color.foregroundMuted)}
      >
        {formatAmount(amount, {
          minimumFractionDigits: 2,
          maximumFractionDigits: Number(amount) < 1 ? 5 : 2,
        })}
      </span>
    </button>
  );
});
