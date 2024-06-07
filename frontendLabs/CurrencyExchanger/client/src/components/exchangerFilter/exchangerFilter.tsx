import styles from "./exchangerFilter.module.css"
import { useContext } from "react";
import { CurrencyContext } from "../../Context/CurrencyContext";
export const ExchangerFilter: React.FC = () => {

    const context = useContext(CurrencyContext);

    if (!context) {
        throw new Error("CurrencyContext is not defined!");
    }

    const { clearFilters, currencyFilter, setInCurrency, setOutCurrency } = context;

    const handleFilterClick = (paymentCur: string, purchasedCur: string) => {
        setInCurrency(paymentCur);
        setOutCurrency(purchasedCur);
    };

    return (
        <>
        <div className={styles.exchangerFilters}>
                {currencyFilter.map((filter, index) => (
                    <button 
                        key={index} 
                        className={styles.filterButton} 
                        onClick={() => handleFilterClick(filter.paymentCurrency, filter.purchasedCurrency)}
                    >
                        {filter.paymentCurrency}/{filter.purchasedCurrency}
                    </button>
                ))}
                <button
                    className={styles.clearFiltersButton}
                    onClick={clearFilters}
                >
                    Clear Filters
                </button>
        </div>
        </>
    )
}