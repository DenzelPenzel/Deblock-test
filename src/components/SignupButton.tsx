'use client';
import WalletWrapper from './WalletWrapper';

const SignupButton = () => {
  return (
    <WalletWrapper
      className="ockConnectWallet_Container min-w-[90px] shrink bg-slate-200 text-[#030712] hover:bg-slate-300"
      text="Sign up"
    />
  );
}

export default SignupButton
