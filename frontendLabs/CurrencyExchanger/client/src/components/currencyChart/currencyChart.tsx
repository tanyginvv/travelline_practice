import React, { useContext, useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { format, isValid, subMinutes } from 'date-fns';
import { CurrencyContext } from '../../Context/CurrencyContext';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const timeIntervals = [
    { label: '5 min', value: 5 },
    { label: '4 min', value: 4 },
    { label: '3 min', value: 3 },
    { label: '2 min', value: 2 },
    { label: '1 min', value: 1 },
];

export const CurrencyChart: React.FC = () => {
    const context = useContext(CurrencyContext);
    const [selectedInterval, setSelectedInterval] = useState(5);

    if (!context) {
        throw new Error("CurrencyExchangeRateChart must be used within a CurrencyProvider");
    }

    const { exchangeRateHistory, inCurrency, outCurrency, fetchExchangeRate, setExchangeRateHistory } = context;

    useEffect(() => {
        fetchExchangeRate();
    }, [selectedInterval, inCurrency, outCurrency, setExchangeRateHistory]);


    const startTime = subMinutes(new Date(), selectedInterval);

    const filteredHistory = exchangeRateHistory.filter(item => {
        const date = new Date(item.date);
        return isValid(date) && date >= startTime;
    });

    const data = {
        labels: filteredHistory.map(item => {
            const date = new Date(item.date);
            return isValid(date) ? format(date, "EEE, dd MMM yyyy HH:mm:ss 'UTC'") : 'Invalid Date';
        }),
        datasets: [
            {
                label: `${inCurrency}/${outCurrency}`,
                data: filteredHistory.map(item => item.price),
                fill: true,
                backgroundColor: 'rgba(0, 0, 186, 0.3)', 
                borderColor: '#0000BA',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            filler: {
                propagate: true,
            }
        },
        scales: {
            x: {
                display: false,
            }
        },
    };

    return (
        <div>
            <div style={{ marginBottom: '10px' }}>
                {timeIntervals.map(interval => (
                    <button
                        key={interval.value}
                        onClick={() => setSelectedInterval(interval.value)}
                        style={{ 
                            margin: '0 16px',
                            padding: '3px 7px',
                            background: interval.value === selectedInterval ? '#0000BA' : '#fff',
                            color: interval.value === selectedInterval ? '#fff' : '#0000BA',
                            border: '1px solid #0000BA',
                            cursor: 'pointer'
                        }}
                    >
                        {interval.label}
                    </button>
                ))}
            </div>
            <div style={{ position: 'relative' }}>
                <Line data={data} options={options} />
            </div>
        </div>
    );
};