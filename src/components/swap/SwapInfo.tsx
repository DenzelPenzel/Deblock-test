import { cn,  text } from '../../styles/theme';
import {InfoSvg} from "../../svg/InfoSvg";
import {CaretDownSvg} from "../../svg/CaretDownSvg";
import {usePrice} from "../../hooks/usePrice";
import {useValue} from "../../hooks/useValue";
import {useSwapContext} from "./SwapProvider";

export function SwapInfo() {
  const { to, from } = useSwapContext();
  const source = useValue(from);
  const destination = useValue(to);

  const { isLoading, price } = usePrice({ balance: source.balance, type: destination?.token?.key  })

  if (isLoading) {
    return null
  }

  return (
    <div className="flex w-full justify-between mt-4">
      <div className="flex gap-1 align-middle">
        {InfoSvg}
        <span className={cn(text.label2)}>Fees included</span>
        {CaretDownSvg}
      </div>
      <div className="flex gap-1 align-middle">
        <span className={cn(text.label2)}>1 {destination?.token?.symbol} = { price } €</span>
      </div>
    </div>
  );
}


