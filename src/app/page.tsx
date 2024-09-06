'use client';

import {useAccount} from 'wagmi';
import LoginButton from '../components/LoginButton';
import SignupButton from '../components/SignupButton';
import {
  Swap,
  SwapAmountInput,
  SwapButton,
  SwapToggleButton,
  SwapInfo
} from '../components/swap';
import {USDCToken, WBTCToken, ETHToken} from '../constants'
import type {Token} from '../types';


const Page = () => {
  const {address} = useAccount();
  const swappableTokens: Token[] = [USDCToken, WBTCToken];

  return (
    <div className="flex h-full w-96 max-w-full flex-col px-1 md:w-[1008px]">
      <section className="flex w-full flex-col md:flex-row">
        <div className="flex w-full items-center justify-end gap-2 md:gap-0">
          <div className="flex items-center gap-3">
            {address ? <SignupButton/> : <LoginButton/>}
          </div>
        </div>
      </section>
      <section className="templateSection flex w-full h-full flex-col items-center justify-center gap-4 px-2 py-4">
        <div className="flex w-[390px] max-w-full items-center justify-center rounded-xl">
          {address && (
            <Swap>
              <SwapAmountInput
                label="You Pay"
                swappableTokens={swappableTokens}
                token={ETHToken}
                type="from"
              />
              <SwapToggleButton/>
              <SwapAmountInput
                label="You Receive"
                swappableTokens={swappableTokens}
                token={USDCToken}
                type="to"
              />
              <SwapInfo/>
              <SwapButton/>
            </Swap>
          )}
        </div>
      </section>
    </div>
  );
}

export default Page