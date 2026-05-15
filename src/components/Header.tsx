import { Button } from "./Button"

export function Header() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Controle de Hábitos</h1>
        <span className="text-zinc-400 text-sm">1/1 concluído(s) hoje.</span>
      </div>
      <div className="flex flex-col gap-1 items-end">
        <span className="text-zinc-400 text-sm ">10/05 - 16/05</span>
        <div className="flex items-center gap-3 justify-center">
          <Button>Ant.</Button>
          <Button>Próx</Button>
        </div>
      </div>
    </header>
  )
}
