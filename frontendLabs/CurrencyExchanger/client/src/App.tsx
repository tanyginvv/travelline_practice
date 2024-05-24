import './App.css'
import { CurrencyExchanger } from "./components/CurrencyExchanger/CurrencyExchanger"
import { CurrencyProvider } from './Context/CurrencyContext'

function App() {

  return (
    <CurrencyProvider>
      <CurrencyExchanger/>
    </CurrencyProvider>
  )
}

export default App
