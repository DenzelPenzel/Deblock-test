import { useCallback, useEffect, useMemo } from 'react';
import { useValue } from '../../hooks/useValue';

import { cn, text } from '../../styles/theme';
import type { SwapAmountInputReact, Token } from '../../types';
import { isValidAmount } from '../../utils';
import { Modal } from '../Modal';
import { TextInput } from '../TextInput';
import { useSwapContext } from './SwapProvider';
import {useIsMounted} from "../../hooks/useIsMounted";
import {usePrice} from "../../hooks/usePrice";

export function SwapAmountInput({
  className,
  delayMs = 1000,
  label,
  token,
  type,
  swappableTokens,
}: SwapAmountInputReact) {
  const { address, to, from, handleAmountChange } = useSwapContext();
  const source = useValue(type === 'from' ? from : to);
  const destination = useValue(type === 'from' ? to : from);

  const { ethBalance, isLoading} = usePrice({ balance: source.balance, type: destination?.token?.key })

  useEffect(() => {
    if (token) {
      source.setToken(token);
    }
  }, [token, source.setToken]);

  const handleMaxButtonClick = useCallback(() => {
    if (!source.balance) {
      return;
    }
    source.setAmount(source.balance);
    handleAmountChange(type, source.balance);
  }, [source.balance, source.setAmount, handleAmountChange, type]);

  const handleChange = useCallback(
    (amount: string) => {
      handleAmountChange(type, amount);
    },
    [handleAmountChange, type],
  );

  const handleSetToken = useCallback(
    (token: Token) => {
      source.setToken(token);
      handleAmountChange(type, source.amount, token);
    },
    [source.amount, source.setToken, handleAmountChange, type],
  );

  const sourceTokenOptions = useMemo(() => {
    return (
      swappableTokens?.filter(
        ({ symbol }: Token) => symbol !== destination.token?.symbol,
      ) ?? []
    );
  }, [swappableTokens, destination.token]);

  const isMounted = useIsMounted();

  if (!isMounted || isLoading) {
    return null;
  }

  return (
    <div
      className={cn(
        'relative flex w-full flex-col z-98 items-start border border-[#D9DCE1]',
        'h-[84px] rounded-lg px-4 py-[12px] shadow-[0px_4px_4px_rgba(0,0,0,0.03)]',
        className,
      )}
    >
      <div className="flex w-full items-center justify-between mb-1">
        <span className={cn(text.label2)}>{label}</span>
        <div className="flex justify-between">
          <div className="flex items-center">
            {type === 'from' && address && (
              <button
                type="button"
                className="flex cursor-pointer  items-center justify-center"
                onClick={handleMaxButtonClick}
              >
                <span className={cn(text.label2, 'text-[#0045F5]')}>Max</span>
              </button>
            )}
            {type === 'from' && source.balance && (
              <span
                className={cn(text.label2, 'text-[#0045F5] ml-1')}
              >{`${ethBalance}`} EUR</span>
            )}
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-between">
        <TextInput
          className={cn(
            'w-full border-[none] bg-transparent font-display text-[2.5rem]',
            'leading-none outline-none',
            'placeholder-[black]',
            text.label1,
          )}
          placeholder="0.0"
          delayMs={delayMs}
          value={source.amount}
          setValue={source.setAmount}
          disabled={source.loading}
          onChange={handleChange}
          inputValidator={isValidAmount}
        />
        <Modal
          type={type}
          token={source.token}
          setToken={handleSetToken}
          options={sourceTokenOptions}
        />
      </div>
    </div>
  );
}
