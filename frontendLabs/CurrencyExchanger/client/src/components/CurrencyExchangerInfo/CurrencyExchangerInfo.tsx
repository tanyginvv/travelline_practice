import { useContext } from "react";
import { CurrencyContext } from "../../Context/CurrencyContext";
import styles from "./CurrencyExchngerInfo.module.css";

export const CurrencyExchangerInfo = () => {
    const context = useContext(CurrencyContext);

    if (!context) {
        throw new Error()
    }

    const  { inCurrency, outCurrency, currencies, menuClick} = context;

    const inCurrencyData = currencies.find(currency => currency.code === inCurrency);
    const outCurrencyData = currencies.find(currency => currency.code === outCurrency);

    return (
        <div className={styles.currenciesInfo} style={{ display: menuClick ? "none" : "flex" }}>
            <div className={styles.infoPaymentCurrency}>
                <h3 className={styles.infoHeader}>{inCurrencyData ? inCurrencyData.name + "-" + inCurrencyData.code + "-" + inCurrencyData.symbol : inCurrency}</h3>
                <p className={styles.infoDescription}>{inCurrencyData ? inCurrencyData.description : ''}</p>
            </div>
            <div className={styles.infoPaymentCurrency}>
                <h3 className={styles.infoHeader}>{outCurrencyData ? outCurrencyData.name + "-" + outCurrencyData.code + "-" + outCurrencyData.symbol : inCurrency}</h3>
                <p className={styles.infoDescription}>{outCurrencyData ? outCurrencyData.description : ''}</p>
            </div>
        </div>
    );
};