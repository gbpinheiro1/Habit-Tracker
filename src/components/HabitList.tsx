import { Button } from "./Button"
import { eachDayOfInterval, endOfWeek, format, startOfWeek } from "date-fns"
import { ptBR } from "date-fns/locale/pt-BR"

export function HabitList() {
  const habits = [
    { id: "1", name: "Oi" },
    { id: "2", name: "Olá" },
  ]

  if (habits.length === 0) {
    return (
      <p className="text-center text-zinc-500 py-12">
        Você ainda não adicionou nenhum hábito, adicione um para começar!
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-3 ">
      {habits.map((habit) => (
        <HabitItem key={habit.id} habit={habit} />
      ))}
    </div>
  )
}

interface HabitItemProps {
  habit: { id: string; name: string }
}

function HabitItem({ habit }: HabitItemProps) {
  const visibleDates = eachDayOfInterval({
    start: startOfWeek(new Date(), { weekStartsOn: 1 }),
    end: endOfWeek(new Date(), { weekStartsOn: 1 }),
  })

  return (
    <div className="rounded-xl bg-zinc-800 p-4 flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <span className="font-medium">{habit.name}</span>
          <span className="text-sm text-amber-400"> 🔥3</span>
        </div>
        <Button>Remover</Button>
      </div>
      <div className="flex gap-1.5">
        {visibleDates.map((date) => (
          <Button key={date.toLocaleDateString()}>
            <span className="font-medium">{formatDate(date)}</span>
            <span>{format(date, "d")}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}

function formatDate(date: Date): string {
  const days = format(date, "EEEEEE", { locale: ptBR })
  return days.charAt(0).toUpperCase() + days.slice(1, 3) + "."
}
