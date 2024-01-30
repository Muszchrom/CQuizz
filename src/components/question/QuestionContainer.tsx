interface QuestionContainerProps {
  children: React.ReactNode
}

const QuestionContainer: React.FC<QuestionContainerProps> = ({children}) => {
  return (
    <div className="bg-white text-black p-3 w-fit sharp-shadow text-left">
      {children}
    </div>
  )
}

export default QuestionContainer