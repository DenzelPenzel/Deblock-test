import {isValidElement} from 'react';
import type {ComponentType, ReactElement, ReactNode} from 'react';

export function isValidAmount(value: string) {
  if (value === '') {
    return true;
  }
  const regex = /^[0-9]*\.?[0-9]*$/;
  return regex.test(value);
}

export const getRoundedAmount = (balance: string, fractionDigits: number) => {
  if (balance === '0') {
    return balance;
  }
  const parsedBalance = Number.parseFloat(balance);
  const result = Number(parsedBalance)
    ?.toFixed(fractionDigits)
    .replace(/0+$/, '');

  // checking if balance is more than 0 but less than fractionDigits
  // without this prints "0."
  if (parsedBalance > 0 && Number.parseFloat(result) === 0) {
    return '0';
  }

  return result;
};

export function findComponent<T>(component: ComponentType<T>) {
  return (child: ReactNode): child is ReactElement<T> => {
    return isValidElement(child) && child.type === component;
  };
}

export function formatAmount(
  amount: string | undefined,
  options: any = {},
): string {
  if (amount === undefined) {
    return '';
  }

  const {locale, minimumFractionDigits, maximumFractionDigits} = options;

  return Number(amount).toLocaleString(locale, {
    minimumFractionDigits,
    maximumFractionDigits,
  });
}

function hashStringToNumber(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function numberToRgb(hash: number) {
  const h = Math.abs(hash) % 360;
  const s = (Math.abs(hash >> 8) % 31) + 50;
  const l = (Math.abs(hash >> 16) % 21) + 40;
  return `hsl(${h}, ${s}%, ${l}%)`;
}

export function getTokenImageColor(str: string) {
  const hash = hashStringToNumber(`${str}`);
  return numberToRgb(hash);
}
