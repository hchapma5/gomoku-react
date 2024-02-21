type GameLabelProps = {
  label: string
}

export default function GameLabel({ label }: GameLabelProps) {
  return (
      <label className="text-2xl font-bold">{label}</label>
  )
}
