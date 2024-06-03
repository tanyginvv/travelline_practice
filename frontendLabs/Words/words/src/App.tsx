import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.scss'
import { HomePage } from './components/homePage/homePage'
import { Dictionary } from './components/DictionaryComponent/Dictionary/dictionary'
import { AddWord } from './components/AddWordComponent/addWord/addWord'
import { Examination } from './components/examinationComponent/examination/examination'
import { EditWord } from './components/editWordsComponent/editWord/editWord'

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/homePage' element={<HomePage/>}/>
        <Route path='/dictionary' element={<Dictionary/>}/>
        <Route path='/addWord' element={<AddWord/>}/>
        <Route path='/editWord/:id' element={<EditWord/>}/>
        <Route path='/examination' element={<Examination/>}/>
        <Route path="*" element={<Navigate to="/homePage" replace/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
