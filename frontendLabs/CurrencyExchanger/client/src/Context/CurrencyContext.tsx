import { createContext, useState, FC, useLayoutEffect, useEffect } from 'react';
import { CurrenciesFilter, Currency, CurrencyContextProps, ExchangeRateEntry, CurrencyProviderProps } from '../types/currencies';
import loadingImg from '../assets/loading-thinking.gif';

export const CurrencyContext = createContext<CurrencyContextProps | undefined>(undefined);

export const CurrencyProvider: FC<CurrencyProviderProps> = ({ children }) => {
    const [inCurrency, setInCurrency] = useState<string>('PLN');
    const [outCurrency, setOutCurrency] = useState<string>('JPY');
    const [exchangeRate, setExchangeRate] = useState<number | null>(null);
    const [description, setDescription] = useState<string>('');
    const [amount, setAmount] = useState<number>(1);
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [menuClick, setMenuClick] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [exchangeRateHistory, setExchangeRateHistory] = useState<{ date: string, price: number }[]>([]);
    const [currencyFilter, setCurrencyFilter] = useState<CurrenciesFilter[]>([]);

    const addFilter = (paymentCur: string, purchasedCur: string) => {
        const newFilter: CurrenciesFilter = {
            paymentCurrency: paymentCur,
            purchasedCurrency: purchasedCur
        };
        setCurrencyFilter([...currencyFilter, newFilter]);
    };

    const clearFilters = () => {
        setCurrencyFilter([]);
    };

    const toggleMenuClick = () => {
        setMenuClick(prevState => !prevState);
    };

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000); // просто выставил 2 секунды, чтобы было видно при загрузке
    }, []);

    const fetchCurrencies = async () => {
        try {
            const response = await fetch('https://localhost:7145/Currency');
            if (!response.ok) {
                throw new Error(`Error fetching currencies: ${response.statusText}`);
            }
            const data = await response.json();
            setCurrencies(data);
        } catch (error) {
            setError('Error fetching currencies');
        } finally {
            setLoading(false);
        }
    };

    const fetchExchangeRate = async () => {
        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours() - 3);
        const formattedDate = currentDate.toISOString();
        const encodedDate = encodeURIComponent(formattedDate);

        const url = `https://localhost:7145/prices?PaymentCurrency=${inCurrency}&PurchasedCurrency=${outCurrency}&FromDateTime=${encodedDate}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error fetching exchange rate: ${response.statusText}`);
            }
            const data = await response.json();
            const formattedData = data.map((entry: ExchangeRateEntry) => ({
                date: entry.dateTime,
                price: entry.price
            }));
            setExchangeRate(data[data.length - 1].price);
            setExchangeRateHistory(formattedData);
        } catch (error) {
            setError('Error fetching exchange rate');
        } finally {
            setLoading(false);
        }
    };

    const fetchDescription = async (code: string) => {
        try {
            const response = await fetch(`https://localhost:7145/Currency/${code}`);
            if (!response.ok) {
                throw new Error(`Error fetching description: ${response.statusText}`);
            }
            const data = await response.json();
            setDescription(data.description);
        } catch (error) {
            setError('Error fetching description');
        } finally {
            setLoading(false);
        }
    };

    useLayoutEffect(() => {
        fetchCurrencies();
    }, []);

    useLayoutEffect(() => {
        fetchExchangeRate();
    }, [inCurrency, outCurrency]);

    return (
        <CurrencyContext.Provider value={{
            inCurrency, setInCurrency, outCurrency, setOutCurrency, exchangeRate,
            description, fetchExchangeRate, fetchDescription, amount, setAmount,
            currencies, menuClick, toggleMenuClick, error, exchangeRateHistory, setExchangeRateHistory,
            currencyFilter, addFilter, clearFilters
        }}>{loading ? (
            <div>
                <p>Loading...</p>
                <img src={loadingImg} alt="Loading" />
            </div>
        ) : (
            children
        )}
        </CurrencyContext.Provider>
    );
};