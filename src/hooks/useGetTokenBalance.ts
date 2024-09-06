import { useMemo } from 'react';
import { erc20Abi, formatUnits } from 'viem';
import type { Address } from 'viem';
import { useReadContract } from 'wagmi';
import type { UseReadContractReturnType } from 'wagmi';
import type { Token, UseGetTokenBalanceResponse } from '../types';
import { getRoundedAmount } from '../utils';

export const useGetTokenBalance = (
  address?: Address,
  token?: Token,
): UseGetTokenBalanceResponse => {
  const tokenBalanceResponse: UseReadContractReturnType = useReadContract({
    abi: erc20Abi,
    address: token?.address as Address,
    functionName: 'balanceOf',
    args: address ? [address] : [],
    query: {
      enabled: !!token?.address && !!address,
    },
  });
  return useMemo(() => {
    if (
      (tokenBalanceResponse?.data !== 0n && !tokenBalanceResponse?.data) ||
      !token
    ) {
      return {
        convertedBalance: '',
        error: null,
        roundedBalance: '',
        response: tokenBalanceResponse,
      };
    }
    const convertedBalance = formatUnits(
      tokenBalanceResponse?.data as bigint,
      token?.decimals,
    );
    return {
      convertedBalance,
      error: null,
      response: tokenBalanceResponse,
      roundedBalance: getRoundedAmount(convertedBalance, 8),
    };
  }, [token, tokenBalanceResponse]);
}
