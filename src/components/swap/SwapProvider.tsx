import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useAccount, useConfig } from 'wagmi';
import { fetchPrices } from '../../api/fetchPrices';
import { useFromTo } from '../../hooks/useFromTo';
import { useValue } from '../../hooks/useValue';
import { useResetInputs } from '../../hooks/userResetInputs';
import type { Token } from '../../types';
import type {
  LifeCycleStatus,
  SwapContextType,
  SwapError,
  SwapProviderReact,
} from '../../types';

const emptyContext = {} as SwapContextType;

export const SwapContext = createContext<SwapContextType>(emptyContext);

export function useSwapContext() {
  const context = useContext(SwapContext);
  if (context === emptyContext) {
    throw new Error('useSwapContext must be used within a Swap component');
  }
  return context;
}

export function SwapProvider({
  children,
  onError,
  onStatus,
  onSuccess,
}: SwapProviderReact) {
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<SwapError>();
  const [isTransactionPending, setPendingTransaction] = useState(false);
  const [lifeCycleStatus, setLifeCycleStatus] = useState<LifeCycleStatus>({
    statusName: 'init',
    statusData: {
    },
  });

  const [hasHandledSuccess, setHasHandledSuccess] = useState(false);
  const { from, to } = useFromTo(address);

  // Refreshes balances and inputs post-swap
  const resetInputs = useResetInputs({ from, to });

  // Component lifecycle emitters
  useEffect(() => {
    // Error
    if (lifeCycleStatus.statusName === 'error') {
      setLoading(false);
      setPendingTransaction(false);
      setError(lifeCycleStatus.statusData);
      onError?.(lifeCycleStatus.statusData);
    }
    if (lifeCycleStatus.statusName === 'amountChange') {
      setError(undefined);
    }
    if (lifeCycleStatus.statusName === 'transactionPending') {
      setLoading(true);
      setPendingTransaction(true);
    }
    if (lifeCycleStatus.statusName === 'transactionApproved') {
      setPendingTransaction(false);
    }
    // Success
    if (lifeCycleStatus.statusName === 'success') {
      setError(undefined);
      setLoading(false);
      setPendingTransaction(false);
      onSuccess?.(lifeCycleStatus.statusData.transactionReceipt);
      setHasHandledSuccess(true);
    }
    // Emit Status
    onStatus?.(lifeCycleStatus);
  }, [
    onError,
    onStatus,
    onSuccess,
    lifeCycleStatus,
    lifeCycleStatus.statusData,
    lifeCycleStatus.statusName,
  ]);

  useEffect(() => {
    if (lifeCycleStatus.statusName === 'init' && hasHandledSuccess) {
      setHasHandledSuccess(false);
      resetInputs();
    }
  }, [hasHandledSuccess, lifeCycleStatus.statusName, resetInputs]);

  useEffect(() => {
    if (lifeCycleStatus.statusName === 'success' && hasHandledSuccess) {
      setLifeCycleStatus({
        statusName: 'init',
        statusData: {
        },
      });
    }
  }, [hasHandledSuccess, lifeCycleStatus.statusName]);

  const handleToggle = useCallback(() => {
    from.setAmount(to.amount);
    to.setAmount(from.amount);
    from.setToken(to.token);
    to.setToken(from.token);
  }, [from, to]);

  const handleAmountChange = useCallback(
    async (
      type: 'from' | 'to',
      amount: string,
      sToken?: Token,
      dToken?: Token,
      // biome-ignore lint/complexity/noExcessiveCognitiveComplexity
    ) => {
      const source = type === 'from' ? from : to;
      const destination = type === 'from' ? to : from;

      source.token = sToken ?? source.token;
      destination.token = dToken ?? destination.token;

      if (source.token === undefined || destination.token === undefined) {
        setLifeCycleStatus({
          statusName: 'amountChange',
          statusData: {
            amountFrom: from.amount,
            amountTo: to.amount,
            tokenFrom: from.token,
            tokenTo: to.token,
          },
        });
        return;
      }

      if (amount === '' || amount === '.' || Number.parseFloat(amount) === 0) {
        return destination.setAmount('');
      }

      destination.setLoading(true);
      setLifeCycleStatus({
        statusName: 'amountChange',
        statusData: {
          amountFrom: type === 'from' ? amount : '',
          amountTo: type === 'to' ? amount : '',
          tokenFrom: from.token,
          tokenTo: to.token,
        },
      });

      try {
        const response = await fetchPrices();

        let amountTo

        if (to.token.key === 'usdc') {
          const fromPrice = response[from.token.key]?.eur ?? 0
          amountTo = (amount * fromPrice).toString()
        } else {
          const toPrice = response[to.token.key]?.eur ?? 0
          const eth2Eur = (response?.['ethereum']?.eur ?? 0) * amount
          amountTo = (eth2Eur / toPrice).toString()
        }

        destination.setAmount(amountTo);

        setLifeCycleStatus({
          statusName: 'amountChange',
          statusData: {
            amountFrom: amount,
            amountTo,
            tokenFrom: from.token,
            tokenTo: to.token,
          },
        });
      } catch (err) {
        setLifeCycleStatus({
          statusName: 'error',
          statusData: {
            code: 'TmSPc01',
            error: JSON.stringify(err),
            message: '',
          },
        });
      } finally {
        destination.setLoading(false);
      }
    },
    [from, to],
  );

  const value = useValue({
    address,
    error,
    from,
    loading,
    handleAmountChange,
    handleToggle,
    lifeCycleStatus,
    isTransactionPending,
    setLifeCycleStatus,
    to,
  });

  return <SwapContext.Provider value={value}>{children}</SwapContext.Provider>;
}
