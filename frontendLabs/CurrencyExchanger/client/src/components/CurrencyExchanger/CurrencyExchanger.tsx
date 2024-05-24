import styles from "./CurrencyExchager.module.css"
import { CurrencyExchangerInput } from "../CurrencyExchangerInput/CurrencyExchangerInput"
import { CurrencyExchangerInfo } from "../CurrencyExchangerInfo/CurrencyExchangerInfo"
import { CurrencyContext } from "../../Context/CurrencyContext"
import { useContext } from "react"

export const CurrencyExchanger: React.FC = () => {
    const context = useContext(CurrencyContext);

    if (!context) {
        throw new Error("CurrencyContext is not defined!");
    }

    const { toggleMenuClick, inCurrency, outCurrency, menuClick, error} = context;

    if(error){
        return (
            <div className={styles.errorBox}>
                <p className={styles.errorBoxText}>COULDN'T GET DATA FROM THE SERVER</p>
            </div>
        )
    }
    return (
        <div className={styles.currencyExchanger}>
            
            <CurrencyExchangerInput />
            <button className={styles.menuClicker} onClick={toggleMenuClick}>{inCurrency}/{outCurrency} : about {menuClick ? '↓' : '↑'}</button>
            <CurrencyExchangerInfo />
        </div>
    );
};