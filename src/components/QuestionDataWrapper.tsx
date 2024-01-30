import { useState } from "react";
import Question from "./Question";
import EndScreen from "./question/EndScreen";

export interface Data {
  questions: string[]
  answers: string[]
  validAnswerForQuestion: [number, number][]
}

// IMPORTANT! validAnswer is an index of answers
export interface QuestionData {
  questionId: number
  validAnswerId: number
  answersIds: number[]
  question: string
  validAnswer: number
  answers: string[]
}

export type GoNextFunc = (
  question: number, 
  userAnswer: number, 
  validAnswer: number
) => void

export type UsersQuizResult = [number, number, number][] // question, usersAnswer, validAnswer

interface QuestionDataWrapperProps {
  data: Data
}

const QuestionDataWrapper: React.FC<QuestionDataWrapperProps> = ({data}) => {
  const [allUserAnswers, setAllUserAnswers] = useState<UsersQuizResult>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showEndScreen, setShowEndScreen] = useState(false)

  // this function takes Data and returns QuestionData
  // if you want to alter answers generated for given question then this is the place
  const generateQuestionData = (): QuestionData | void => {
    // check if there are questions left 
    if (currentQuestion >= data.validAnswerForQuestion.length) {
      setShowEndScreen(true)
      return
    }
    const qId = data.validAnswerForQuestion[currentQuestion][0] // index of question
    const aId = data.validAnswerForQuestion[currentQuestion][1] // index of correct answer
    
    const randomNumber = (max: number) => Math.floor(Math.random() * max) // generate number from 0 to max (excluded)
    const [answers, validAnswer, answersIds] = (() => {
      // generate indexes of wrong answers
      const uniqueIds: number[] = []
      const nOfQuestions = 4
      while (uniqueIds.length < nOfQuestions) {
        const rnum = randomNumber(data.answers.length)
        // check if number is already in unique array or if number is the same as the correct answer
        if (rnum in uniqueIds || rnum === aId) {
          continue
        } else {
          uniqueIds.push(rnum)
        }
      }
      // replace random incorrect answer with the correct one and keep it's index
      const correctAnswerInPossibleAnswers = randomNumber(nOfQuestions)
      console.log(correctAnswerInPossibleAnswers)
      uniqueIds[correctAnswerInPossibleAnswers] = aId
      // map indexes (numbers) to questions (strings)
      const possibleAnswers = uniqueIds.map((item) => data.answers[item])
      return [possibleAnswers, correctAnswerInPossibleAnswers, uniqueIds]
    })()
    
    return {
      questionId: qId,
      validAnswerId: aId,
      answersIds: answersIds,
      question: data.questions[qId],
      validAnswer: validAnswer,
      answers: answers
    }
  }

  const goNext: GoNextFunc = (question, userAnswer, validAnswer) => {
    setCurrentQuestion(currentQuestion + 1)
    allUserAnswers.push([question, userAnswer, validAnswer])
    setAllUserAnswers(allUserAnswers)
  }

  const restart = () => {
    setAllUserAnswers([])
    setCurrentQuestion(0)
    setShowEndScreen(false)
  }

  return (
    <>
      {!showEndScreen ? (
        <Question questionData={generateQuestionData() as QuestionData} handleGoNextClick={goNext}>
          {currentQuestion+1}/{data.validAnswerForQuestion.length}
        </Question>
      ) : (
        <EndScreen quizResult={allUserAnswers} onClick={restart}/>
      )}
    </>
  )
}

export default QuestionDataWrapper