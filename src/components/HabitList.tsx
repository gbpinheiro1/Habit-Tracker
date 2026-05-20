import { Button } from "./Button"
import {
  eachDayOfInterval,
  endOfWeek,
  format,
  isFuture,
  startOfWeek,
} from "date-fns"
import { ptBR } from "date-fns/locale/pt-BR"

export type Habit = { id: string; name: string }

type HabitListProps = {
  habits: Habit[]
  deleteHabit: (id: string) => void
}

export function HabitList({ habits, deleteHabit }: HabitListProps) {
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
        <HabitItem deleteHabit={deleteHabit} key={habit.id} habit={habit} />
      ))}
    </div>
  )
}

interface HabitItemProps {
  habit: Habit
  deleteHabit: (id: string) => void
}

function HabitItem({ habit, deleteHabit }: HabitItemProps) {
  const visibleDates = eachDayOfInterval({
    start: startOfWeek(new Date(), { weekStartsOn: 1 }),
    end: endOfWeek(new Date(), { weekStartsOn: 1 }),
  })

  return (
    <div className="rounded-xl bg-zinc-800 p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <span className="font-medium">{habit.name}</span>
          <span className="text-sm text-amber-400"> 🔥3</span>
        </div>
        <Button
          onClick={() => deleteHabit(habit.id)}
          variant="delete"
          className="text-sm"
        >
          Remover
        </Button>
      </div>
      <div className="flex gap-1.5">
        {visibleDates.map((date) => (
          <Button
            className="flex flex-1 flex-col items-center gap-0.5 rounded-lg text-xs"
            key={date.toLocaleDateString()}
            disabled={isFuture(date)}
          >
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
