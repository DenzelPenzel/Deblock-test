import type {Dispatch, ReactNode, SetStateAction} from 'react';
import type {Address, Hex, TransactionReceipt} from 'viem';
import type {
  UseBalanceReturnType,
  UseReadContractReturnType,
} from 'wagmi';


export type FromTo = {
  from: SwapUnit;
  to: SwapUnit;
};

export type LifeCycleStatus =
  | {
  statusName: 'init';
  statusData: {};
}
  | {
  statusName: 'error';
  statusData: SwapError;
}
  | {
  statusName: 'amountChange';
  statusData: {
    amountFrom: string;
    amountTo: string;
    tokenFrom?: Token;
    tokenTo?: Token;
  };
}
  | {
  statusName: 'slippageChange';
  statusData: {
    maxSlippage: number;
  };
}
  | {
  statusName: 'transactionPending';
  statusData: null;
}
  | {
  statusName: 'transactionApproved';
  statusData: {
    transactionHash: Hex;
    transactionType: 'ERC20' | 'Permit2';
  };
}
  | {
  statusName: 'success';
  statusData: {
    transactionReceipt: TransactionReceipt;
  };
};


export type SwapAmountInputReact = {
  className?: string;
  delayMs?: number;
  label: string;
  swappableTokens?: Token[];
  token?: Token;
  type: 'to' | 'from';
};

export type SwapButtonReact = {
  className?: string;
  disabled?: boolean;
};

export type SwapContextType = {
  address?: Address;
  error?: SwapError;
  from: SwapUnit;
  lifeCycleStatus: LifeCycleStatus;
  loading: boolean;
  isTransactionPending: boolean;
  handleAmountChange: (
    t: 'from' | 'to',
    amount: string,
    st?: Token,
    dt?: Token,
  ) => void;
  handleSubmit: () => void;
  handleToggle: () => void;
  setLifeCycleStatus: (state: LifeCycleStatus) => void;
  to: SwapUnit;
};

export type SwapProviderReact = {
  children: React.ReactNode;
  onError?: (error: SwapError) => void;
  onStatus?: (lifeCycleStatus: LifeCycleStatus) => void;
  onSuccess?: (transactionReceipt: TransactionReceipt) => void;
};

export type SwapReact = {
  children: ReactNode;
  className?: string;
  experimental?: {
    useAggregator: boolean;
    maxSlippage?: number;
  };
  onError?: (error: SwapError) => void;
  onStatus?: (lifeCycleStatus: LifeCycleStatus) => void;
  onSuccess?: (transactionReceipt: TransactionReceipt) => void;
  title?: string;
};

export type SwapToggleButtonReact = {
  className?: string;
};

export type SwapUnit = {
  amount: string;
  balance?: string;
  balanceResponse?: UseBalanceReturnType | UseReadContractReturnType;
  error?: SwapError;
  loading: boolean;
  setAmount: Dispatch<SetStateAction<string>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setToken: Dispatch<SetStateAction<Token | undefined>>;
  token: Token | undefined;
};

export type Token = {
  address: Address | '';
  chainId: number;
  decimals: number;
  image: string | null;
  name: string;
  symbol: string;
  key: string;
};

export type UseGetTokenBalanceResponse = {
  error?: SwapError;
  response?: UseReadContractReturnType;
  convertedBalance?: string;
  roundedBalance?: string;
};

export type UseGetETHBalanceResponse = {
  error?: SwapError;
  response?: UseBalanceReturnType;
  convertedBalance?: string;
  roundedBalance?: string;
};

export type SwapError = {
  code: string;
  error: string;
  message: string;
};

export type TokenSelectModalReact = {
  type: string;
  options: Token[];
  setToken: (token: Token) => void;
  token?: Token;
};

export type TokenRowReact = {
  className?: string;
  token: Token;
  amount?: string;
  onClick?: (token: Token) => void;
  hideSymbol?: boolean;
  hideImage?: boolean;
};

export type TokenImageReact = {
  className?: string;
  size?: number;
  token: Token;
};

export type TokenSelectButtonReact = {
  className?: string;
  isOpen: boolean;
  onClick: () => void;
  token?: Token;
};
