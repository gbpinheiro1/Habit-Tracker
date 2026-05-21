import { Header } from "./components/Header"
import { HabitForm } from "./components/HabitForm"
import { HabitList } from "./components/HabitList"
import { useState } from "react"
import type { Habit } from "./components/HabitList"
import { isSameDay } from "date-fns"

export default function App() {
  const [habits, setHabit] = useState<Habit[]>([])

  function addHabit(name: string) {
    setHabit((curr) => [
      ...curr,
      { id: crypto.randomUUID(), name, completions: [] },
    ])
  }

  function deleteHabit(id: string) {
    setHabit((curr) => curr.filter((h) => h.id !== id))
  }

  function toggleHabit(id: string, date: Date) {
    setHabit((curr) =>
      curr.map((h) => {
        if (h.id !== id) return h

        const alreadyDone = h.completions.some((c) => isSameDay(c, date))
        const completions = alreadyDone
          ? h.completions.filter((c) => !isSameDay(c, date))
          : [...h.completions, date]

        return { ...h, completions }
      }),
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
      <Header />
      <HabitForm addHabit={addHabit} />
      <HabitList
        deleteHabit={deleteHabit}
        toggleHabit={toggleHabit}
        habits={habits}
      />
    </div>
  )
}
