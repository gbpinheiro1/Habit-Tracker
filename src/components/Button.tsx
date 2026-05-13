interface Props {
  text: string
}

export function Button({ text }: Props) {
  return <button className="bg-violet-600 hover:bg-violet-500">{text}</button>
}
