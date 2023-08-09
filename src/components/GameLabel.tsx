import style from './GameLabel.module.css'

type GameLabelProps = {
  label: string
}

export default function GameLabel({ label }: GameLabelProps) {
  return (
    <div className={style.container}>
      <label>{label}</label>
    </div>
  )
}
