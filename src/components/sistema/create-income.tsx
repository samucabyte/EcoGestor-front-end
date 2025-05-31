"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormEvent, useState } from "react"
import api from "@/api/get"
import { LucideIcon } from "lucide-react"
import { Toaster } from "../ui/sonner"
import { toast } from "sonner"

type Props = {
    title: string
    icon: LucideIcon
    open: boolean
    setOpen: (open: boolean) => void
}

export function CreateIncomeDialog({ title, icon, open, setOpen }: Props) {
    const [source, setSource] = useState("")
    const [amount, setAmount] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        console.log(amount);
        const income = await api.createIncome(source, parseFloat(amount))

        if (!income.success) {
            setError(income.message)
            console.log("Erro ao criar:", income.message)
            return
        }

        toast.success(`Renda adicionada com sucesso!`)
        console.log("Renda criada com sucesso!")
        setSource("")
        setAmount("")
        setError("")
        console.log("Fechando dialog agora")
        setOpen(false)
    }

    const Icon = icon

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>
                            Adicione uma nova renda. Clique em "Salvar" para confirmar.
                            {error && <p className="text-red-500 mt-2">{error}</p>}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="income" className="text-right">Descrição</Label>
                            <Input
                                id="income"
                                value={source}
                                onChange={(e) => setSource(e.target.value)}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="amount" className="text-right">Valor</Label>
                            <Input

                                id="amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="col-span-3"
                                required
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="submit">Salvar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
