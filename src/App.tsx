import { Header } from "./components/Header"
import { HabitForm } from "./components/HabitForm"
import { HabitList } from "./components/HabitList"
import { useState } from "react"
import type { Habit } from "./components/HabitList"

export default function App() {
  const [habits, setHabit] = useState<Habit[]>([])

  function addHabit(name: string) {
    setHabit([...habits, { id: crypto.randomUUID(), name }])
  }

  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
      <Header />
      <HabitForm addHabit={addHabit} />
      <HabitList habits={habits} />
    </div>
  )
}
