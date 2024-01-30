import QuestionContainer from "./question/QuestionContainer"
import Button from "./question/Button"
import AnswerContainer from "./question/AnswerContainer"
import { useState } from "react"
import { QuestionData, GoNextFunc } from "./QuestionDataWrapper"

interface QeustionProps {
  children: React.ReactNode
  questionData: QuestionData,
  handleGoNextClick: GoNextFunc
}

const Question: React.FC<QeustionProps> = ({questionData, handleGoNextClick, children}) => {
  const [showAnswer, setShowAnswer] = useState(false)
  const [userAnswer, setUserAnswer] = useState(-1) // its used only after showAnswer is true 
  const [wrongAnswerId, setWrongAnswerId] = useState(-1)
  
  const submitAnswer = (answerId: number) => {
    setShowAnswer(true)
    setUserAnswer(questionData.answersIds[answerId])
    if (answerId === questionData.validAnswer) {
      // do something
    } else {
      setWrongAnswerId(answerId)
    }
  }

  const goNext = () => {
    handleGoNextClick(questionData.questionId, userAnswer, questionData.validAnswerId)
    setShowAnswer(false)
    setWrongAnswerId(-1)
    setUserAnswer(-1)
  }

  const getColor = (index: number) => {
    if (!showAnswer) return 
    if (questionData.validAnswer === index) return "green"
    if (wrongAnswerId === index) return "red"
    return
  }

  return (
    <div className="flex flex-col gap-6">
      <QuestionContainer>
        {questionData.question}
      </QuestionContainer>
      <div className="flex flex-col gap-2">
        {questionData.answers.map((answer, index) => {
          return <AnswerContainer 
                    key={index}
                    color={getColor(index)}
                    handleClick={() => submitAnswer(index)}
                    hoverEffect={!showAnswer}
                  >
                    {answer}
                  </AnswerContainer>
        })}
      </div>
      <div className="flex justify-between items-center">
        <span>
          {children}
        </span>
        <button disabled className="text-transparent bg-transparent border-transparent cursor-default hover:border-transparent">D</button>
        {showAnswer && (
          <Button handleClick={goNext}>
            Następne pytanie
          </Button>
        )}
      </div>
    </div>
  )
}

export default Question