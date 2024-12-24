import { useState } from "react";


type Todo = {
    name: string;
    age: number;
    height: number
}
// pick
type PersonPick = Pick<Todo, 'name' | 'age'>
// omit
type PersonOmit = Omit<Todo, 'height'>
// Partial
type PersonPartial = Partial<Todo>
// Required
type PersonRequired = Required<Omit<Todo, 'height'>>
// Record
type PersonRecord = Record<'name' | 'age', string>
// NonNullable
// type PersonNonNullable = NonNullable<string | number | undefined>

const Index = () => {

    const a:Todo = { name: 'clear', age: 18, height: 180 }

    const b:PersonPartial = { name: 'clear123'}

    const c:PersonPick = { name: 'clear', age: 123 }

    const d:PersonOmit = { name: 'clear', age: 123 }

    const e:PersonRequired = { name: 'clear', age: 18 }

    const f:Partial<PersonRecord> = { name: 'clear' }

    return (
        <div>ts</div>
    )
}

export default Index;