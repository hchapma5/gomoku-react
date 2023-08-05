import React, { useState, ChangeEvent } from 'react'

import style from './Dropdown.module.css'

type DropdownProps = {
  minValue: number
  maxValue: number
  label: string
}

export default function Dropdown(props: DropdownProps) {
  const { minValue, maxValue, label } = props
  const [size, setSize] = useState(0)

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSize(parseInt(event.target.value))
  }
  const sizes = Array.from(
    { length: maxValue - minValue },
    (_, i) => i + minValue
  )

  return (
    <div className={style.menu}>
      <p>{label}</p>
      <select value={size} onChange={handleChange}>
        {sizes.map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
    </div>
  )
}
