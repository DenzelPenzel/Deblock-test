import {useMemo } from 'react';
import {useQuery} from "@tanstack/react-query";
import {fetchPrices} from "../api/fetchPrices";
import {getRoundedAmount} from "../utils";

export const usePrice = ({ type, balance }: { balance: string, type?: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["ETH_PRICE"],
    queryFn: fetchPrices,
  });

  const ethBalance = useMemo(() => {
    const priceEur = getRoundedAmount(data?.['ethereum']?.eur ?? 1, 8)
    const bal = getRoundedAmount(balance, 8)
    return (bal * priceEur).toFixed(2)
  }, [type, data, balance])

  const price = useMemo(() => {
    const dataKey = type || 'ethereum'
    return (data?.[dataKey]?.eur ?? 1).toFixed(2)
  }, [type, data])

  return { ethBalance, price, isLoading };
}
