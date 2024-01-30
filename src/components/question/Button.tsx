import clsx from "clsx"

interface ButtonProps {
  children: React.ReactNode
  handleClick: () => void
  full?: boolean
}

const Button: React.FC<ButtonProps> = ({children, handleClick, full}) => {
  return (
    <div role="button" onClick={handleClick} className={clsx("bg-white text-black p-3 sharp-shadow", full ? "w-full" : "w-fit")}>
      {children}
    </div>
  )
}

export default Button