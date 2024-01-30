import './App.css'

import QuestionDataWrapper from './components/QuestionDataWrapper'
import QA from './assets/questions.json'

import { Data } from './components/QuestionDataWrapper'

function App() {
  return (
    <>
      {/* Fix this QA as Data in the future*/}
      <QuestionDataWrapper data={QA as Data}/>
    </>
  )
}

export default App
