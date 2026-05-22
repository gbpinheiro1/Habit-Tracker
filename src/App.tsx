import { Header } from "./components/Header"
import { HabitForm } from "./components/HabitForm"
import { HabitList } from "./components/HabitList"
import { HabitProvider } from "./context/HabitProvider"
import { useState } from "react"
import { addWeeks, eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns"

export default function App() {
  //Mudar os dados de acordo com a semana da lista de hábitos
  const [weekOffset, setWeekOffset] = useState(0)

  const week = addWeeks(new Date(), weekOffset)

  const visibleDates = eachDayOfInterval({
    start: startOfWeek(week, { weekStartsOn: 1 }),
    end: endOfWeek(week, { weekStartsOn: 1 }),
  })

  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
      <HabitProvider>
        <Header
          visibleDates={visibleDates}
          onNext={() => setWeekOffset((w) => w + 1)}
          onPrev={() => setWeekOffset((w) => w - 1)}
        />
        <HabitForm />
        <HabitList visibleDates={visibleDates} />
      </HabitProvider>
    </div>
  )
}
