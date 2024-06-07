import { Dispatch, SetStateAction , ReactNode} from 'react';

export interface Currency {
  code: string;
  name: string;
  description: string;
  symbol: string;
}


export interface CurrencyProviderProps {
  children: ReactNode;
}
export interface ExchangeRateEntry {
  dateTime: string;
  price: number;
}

export interface CurrenciesFilter {
  paymentCurrency: string;
  purchasedCurrency: string;
}

export interface CurrencyContextProps {
  inCurrency: string;
  setInCurrency: Dispatch<SetStateAction<string>>;
  outCurrency: string;
  setOutCurrency: Dispatch<SetStateAction<string>>;
  exchangeRate: number | null;
  description: string;
  fetchExchangeRate: () => void;
  fetchDescription: (code: string) => void;
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
  currencies: Currency[];
  menuClick: boolean;
  toggleMenuClick: () => void;
  error: string | null;
  exchangeRateHistory: { date: string; price: number }[];
  setExchangeRateHistory: Dispatch<SetStateAction<{ date: string; price: number }[]>>;
  currencyFilter: CurrenciesFilter[];
  addFilter: (paymentCur: string, purchasedCur: string) => void;
  clearFilters: () => void;
}