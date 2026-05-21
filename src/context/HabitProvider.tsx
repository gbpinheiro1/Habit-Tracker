import { isSameDay } from "date-fns/isSameDay"
import { createContext, useContext, useState, type ReactNode } from "react"

export type Habit = { id: string; name: string; completions: Date[] }

type Context = {
  habits: Habit[]
  addHabit: (name: string) => void
  deleteHabit: (id: string) => void
  toggleHabit: (id: string, date: Date) => void
}

type HabitProviderProps = {
  children: ReactNode
}

//Criando HabitContext com null como default
export const HabitContext = createContext<null | Context>(null)

export function HabitProvider({ children }: HabitProviderProps) {
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
    <HabitContext value={{ habits, addHabit, deleteHabit, toggleHabit }}>
      {children}
    </HabitContext>
  )
}

//Criando um Custom Hook
export function useHabits() {
  const habitContext = useContext(HabitContext)

  if (habitContext == null) throw new Error("Context tem o valor null")

  return habitContext
}
