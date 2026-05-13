import { Button } from "./components/Button"

export default function App() {
  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
      <Header></Header>
    </div>
  )
}

function Header() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Controle de Hábitos</h1>
        <span className="text-zinc-400 text-sm">1/1 concluído(s) hoje.</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-zinc-400 text-sm">10 de Maio - 16 de Maio</span>
        <div className="flex items-center gap-3">
          <Button text="Ant."></Button>
          <Button text="Próx."></Button>
        </div>
      </div>
    </header>
  )
}
