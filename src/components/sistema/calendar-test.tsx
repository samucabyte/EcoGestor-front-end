"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import api from '@/api/get'
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"
//import { toast } from "@/components/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { FormEvent, JSX, useState } from "react"

const FormSchema = z.object({
    dob: z.date({
        required_error: "A date of birth is required.",
    }),
})

// CalendarForm.tsx
export function CalendarFormTest({ onDateChange }: { onDateChange: (date: string) => void }) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth()); // 0-11
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    const months = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        const formattedDate = `${selectedYear}-${(selectedMonth + 1).toString().padStart(2, '0')}`;
        onDateChange(formattedDate);

    };


    return (

        <form onSubmit={onSubmit} className="p-3 flex space-y-8">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[240px] justify-between">
                        {`${months[selectedMonth]} de ${selectedYear}`}
                        <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[260px] flex flex-col gap-2">
                    <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                        className="border rounded p-2"
                    >
                        {months.map((month, index) => (
                            <option className="bg-gray-100 text-black hover:bg-gray-200" key={index} value={index}>{month}</option>
                        ))}
                    </select>
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                        className="border rounded p-2"
                    >
                        {years.map((year) => (
                            <option className="bg-gray-100 text-black hover:bg-gray-200" key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </PopoverContent>
            </Popover>

            <Button type="submit">Submit</Button>
        </form>

    );
}


