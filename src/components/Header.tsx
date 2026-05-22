import { isToday } from "date-fns"
import { useHabits } from "../context/HabitProvider"
import { Button } from "./Button"
import { format } from "date-fns/fp"

type HeaderProps = {
  visibleDates: Date[]
  onPrev: () => void
  onNext: () => void
}

export function Header({ visibleDates, onNext, onPrev }: HeaderProps) {
  const { habits } = useHabits()

  const doneToday = habits.filter((h) =>
    h.completions.some((c) => isToday(c)),
  ).length

  //Formatando para renderizar
  const dateRange = `${format("dd/MM", visibleDates[0])} - ${format("dd/MM", visibleDates[visibleDates.length - 1])}`

  return (
    <header className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Controle de Hábitos</h1>
        <span className="text-zinc-400 text-sm">
          {doneToday}/{habits.length} concluído(s) hoje.
        </span>
      </div>
      <div className="flex flex-col gap-1 items-end">
        <span className="text-zinc-400 text-sm ">{dateRange}</span>
        <div className="flex items-center gap-3 justify-center">
          <Button variant="primary" onClick={onPrev}>
            Ant.
          </Button>
          <Button
            variant="primary"
            onClick={onNext}
            disabled={visibleDates.some((d) => isToday(d))}
          >
            Próx
          </Button>
        </div>
      </div>
    </header>
  )
}
