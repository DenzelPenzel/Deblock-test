import {
  type ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {background, cn, text} from '../styles/theme';
import {CaretDownSvg} from '../svg/CaretDownSvg';
import {CaretUpSvg} from '../svg/CaretUpSvg';
import type {
  Token,
  TokenSelectButtonReact,
  TokenSelectModalReact,
} from '../types';
import {Image} from './Image';
import {Row} from './Row';

const backdropStyle = {
  background: 'rgba(226, 232, 240, 0.5)',
};

type TokenSelectModalInnerReact = {
  setToken: (t: Token) => void;
  closeModal: () => void;
  options: Token[];
};

const TokenSelectModalInner = ({
                                 setToken,
                                 closeModal,
                                 options,
                               }: TokenSelectModalInnerReact) => {
  const [filteredTokens] = useState(options);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(
    (token: Token) => {
      setToken(token);
      closeModal();
    },
    [setToken, closeModal],
  );

  const handleBlur = useCallback(
    (event: MouseEvent) => {
      const isOutsideModal =
        modalRef.current && !modalRef.current.contains(event.target as Node);
      if (isOutsideModal) {
        closeModal();
      }
    },
    [closeModal],
  );

  useEffect(() => {
    setTimeout(() => {
      document.addEventListener('click', handleBlur);
    }, 0);
    return () => {
      document.removeEventListener('click', handleBlur);
    };
  }, [handleBlur]);

  return (
    <div
      className="fixed bottom-0 left-0 z-50 flex h-full w-full items-center justify-center "
      style={backdropStyle}
    >
      <div
        className={cn(
          'h-full z-10 flex flex-col justify-end',
        )}
      >
        <div ref={modalRef} className="flex w-[390px] flex-col bg-[#FBFAF9] rounded-t-[16px] p-2 px-6 gap-9 pt-2">
          <div
            className={cn(
              background.alternate,
              'mx-auto mb-2 h-1 w-[54px] rounded-[6.25rem]',
            )}
          />
          <div className="flex items-center justify-between">
            <span className={cn(text.title3, 'text-[28px] leading-[36px]')}>Exchange To</span>
          </div>
          {filteredTokens.length > 0 ? (
            <div
              className="ock-scrollbar overflow-y-auto"
              style={{minHeight: '196px', height: '196px'}}
            >
              {filteredTokens.map((token, idx) => (
                <Row
                  key={`${token.name}${idx}`}
                  token={token}
                  onClick={handleClick}
                />
              ))}
            </div>
          ) : (
            <div
              className="text-black text-body"
              style={{minHeight: '368px'}}
            >
              No tokens found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const TokenSelect = forwardRef(function TokenSelectButton(
  {onClick, token, isOpen, className}: TokenSelectButtonReact,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  return (
    <button
      type="button"
      data-testid="ockTokenSelectButton_Button"
      className={cn(
        'flex w-fit items-center gap-2 rounded-lg px-3 py-1 outline-none',
        className,
      )}
      onClick={onClick}
      ref={ref}
    >
      {token ? (
        <>
          <div className="w-4">
            <Image token={token} size={16}/>
          </div>
          <span
            className={cn(text.label1, 'text-[16px]')}
            data-testid="ockTokenSelectButton_Symbol"
          >
            {token.symbol}
          </span>
        </>
      ) : (
        <span className={text.headline}>Select token</span>
      )}
      <div className="relative flex items-center justify-center">
        <div className="absolute top-0 left-0 h-4 w-4"/>
        {isOpen ? CaretUpSvg : CaretDownSvg}
      </div>
    </button>
  );
});

export function Modal({type, options, setToken, token}: TokenSelectModalReact) {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openModal = useCallback(() => {
    if (type === 'to') {
      setIsOpen(true);
    }
  }, []);

  return (
    <>
      <TokenSelect onClick={openModal} isOpen={isOpen} token={token}/>
      {isOpen && (
        <TokenSelectModalInner
          options={options}
          setToken={setToken}
          closeModal={closeModal}
        />
      )}
    </>
  );
}
