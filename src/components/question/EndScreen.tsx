import { UsersQuizResult } from "../QuestionDataWrapper"
import Button from "./Button"

interface EndScreenProps {
  quizResult: UsersQuizResult
  onClick: () => void
}

const EndScreen: React.FC<EndScreenProps> = ({quizResult, onClick}) => {
  console.log(quizResult)
  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-48 m-auto">
      <span>Wynik</span>
      {quizResult.reduce((corrAnsw, subArr) => corrAnsw + (subArr[1] === subArr[2] ? 1 : 0), 0)}/{quizResult.length}
      <Button handleClick={onClick} full={true}>Restart</Button>
    </div>
  )
}

export default EndScreen