import style from './styles/Button.module.css'

export default function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return <button className={style.button} {...props} />
}
