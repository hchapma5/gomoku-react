import React, { ChangeEvent } from 'react'

import style from './Dropdown.module.css'

type DropdownProps = {
  value: number
  setValue: (value: number) => void
  minValue: number
  maxValue: number
  label: string
}

export default function Dropdown(props: DropdownProps) {
  const { value, setValue, minValue, maxValue, label } = props

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setValue(parseInt(event.target.value))
  }
  const sizes = Array.from(
    { length: maxValue - minValue + 1 },
    (_, i) => i + minValue
  )

  return (
    <div className={style.menu}>
      <p>{label}</p>
      <select value={value} onChange={handleChange}>
        {sizes.map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
    </div>
  )
}
