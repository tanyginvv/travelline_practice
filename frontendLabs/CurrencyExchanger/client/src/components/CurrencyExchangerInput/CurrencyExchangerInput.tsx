import React, { useContext } from 'react';
import { format } from 'date-fns';
import styles from "./CurrencyExchangerInput.module.css";
import { CurrencyContext } from '../../Context/CurrencyContext';

export const CurrencyExchangerInput: React.FC = () => {
    const context = useContext(CurrencyContext);

    if (!context) {
        throw new Error("CurrencyExchangerInput must be used within a CurrencyProvider");
    }

    const { inCurrency, setInCurrency, outCurrency, setOutCurrency, exchangeRate, amount, setAmount, currencies } = context;

    const currentDate = new Date();
    const formattedDate = format(currentDate, "EEE, dd MMM yyyy HH:mm 'UTC'");

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            setAmount(value);
        }
    };

    const inCurrencyData = currencies.find(currency => currency.code === inCurrency);
    const outCurrencyData = currencies.find(currency => currency.code === outCurrency);

    return (
        <div className={styles.exchangerInput}>
            <p className={styles.inputIn}>
                {amount} {inCurrencyData ? inCurrencyData.name : inCurrency} is
            </p>
            <span className={styles.inputOut}>
                {exchangeRate ? (amount * exchangeRate).toFixed(3) : ''} {outCurrencyData ? outCurrencyData.name : outCurrency}
            </span>
            <p className={styles.inputDate}>{formattedDate}</p>
            <div className={styles.inForm}>
                <input 
                    type="number" 
                    id="inCurrency" 
                    className={styles.inFormValue} 
                    value={amount} 
                    onChange={handleAmountChange} 
                />
                <select
                    className={styles.inFormSelect}
                    value={inCurrency}
                    onChange={(e) => setInCurrency(e.target.value)}
                >
                    {currencies.map((currency) => (
                        <option key={currency.code} value={currency.code}>
                            {currency.code}
                        </option>
                    ))}
                </select>
            </div>
            <div className={styles.inForm}>
                <input 
                    id="outCurrency" 
                    className={styles.inFormValue}  
                    value={exchangeRate ? (amount * exchangeRate).toFixed(3) : ''}
                    readOnly
                />
                <select
                    className={styles.inFormSelect}
                    value={outCurrency}
                    onChange={(e) => setOutCurrency(e.target.value)}
                >
                    {currencies.map((currency) => (
                        <option key={currency.code} value={currency.code}>
                            {currency.code}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};
