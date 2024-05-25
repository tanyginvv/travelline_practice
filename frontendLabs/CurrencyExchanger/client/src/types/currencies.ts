export interface Currency {
  code: string;
  name: string;
  description: string;
  symbol: string;
}


export interface Currency {
  code: string;
  name: string;
  description: string;
  symbol: string;
}

export interface CurrencyContextProps {
  inCurrency: string;
  setInCurrency: (currency: string) => void;
  outCurrency: string;
  setOutCurrency: (currency: string) => void;
  exchangeRate: number | null;
  description: string;
  fetchExchangeRate: () => void;
  fetchDescription: (code: string) => void;
  amount: number;
  setAmount: (amount: number) => void;
  currencies: Currency[];
  menuClick: boolean,
  toggleMenuClick: () => void;
  error: string | null;
  exchangeRateHistory: { date: string, price: number }[]
}

export interface ExchangeRateEntry {
  dateTime: string;
  price: number;
}