import React, { ChangeEvent } from 'react'

import style from './Dropdown.module.css'

type DropdownProps = {
  label: string
  setValue: (value: number) => void
  minValue: number
  maxValue: number
  active?: boolean
}

export default function Dropdown(props: DropdownProps) {
  const { label, setValue, minValue, maxValue, active } = props

  const sizes = Array.from(
    { length: maxValue - minValue + 1 },
    (_, i) => i + minValue
  )

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === undefined) return
    const value = parseInt(event.target.value)
    setValue(value)
  }

  return (
    <div className={style.container}>
      <select onChange={handleChange} disabled={active}>
        <option value={undefined}>{label}</option>
        {sizes.map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
    </div>
  )
}
