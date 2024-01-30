import clsx from "clsx"
interface AnswerContainerProps {
  children: React.ReactNode
  handleClick: () => void
  color?: "red" | "green"
  hoverEffect: boolean
}

const AnswerContainer: React.FC<AnswerContainerProps> = ({children, handleClick, color, hoverEffect}) => {
  return (
    <div 
      role="button" 
      tabIndex={0}
      onClick={handleClick} 
      className={clsx(
        "bg-transparent border border-white p-3 text-left", 
        color === "green" && "bg-[#2bbc2f]",
        color === "red" && "bg-[red]",
        hoverEffect && "hover:bg-white hover:text-black"
      )}
    >
      {children}
    </div>
  )
}

export default AnswerContainer