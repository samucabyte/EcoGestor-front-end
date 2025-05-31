"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormEvent, useEffect, useState } from "react"

import api from "@/api/get";
import { toast } from "sonner"
type Props = {
    incomeId: number
    open: boolean
    setOpen: (open: boolean) => void
}

export function IncomeEditDialog({ incomeId, open, setOpen }: Props) {

    const [id, setId] = useState(0);
    const [source, setSource] = useState("");
    const [amount, setAmount] = useState("")

    useEffect(() => {
        if (!open) return;
        async function item() {
            const itemIncome = await api.getOneIncome(incomeId);
            setId(itemIncome.data[0].id || "");
            setSource(itemIncome.data[0].source || "");
            setAmount(itemIncome.data[0].amount?.toString() || "");
        }

        item();
    }, [open, incomeId]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const update = await api.updateIncome(
            id,
            source,
            parseFloat(amount)
        )
        toast.success(`Renda Atualizada com sucesso!`)
        if (update) {
            setOpen(false);
        }
    }
    return (
        <>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="cursor-pointer bg-blue-800 text-white" variant="outline">Editar</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <form method="PUT" onSubmit={handleSubmit}>
                        <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                                Faça suas alterações aqui. Clique em "Salvar" quando terminar.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Descrição
                                </Label>
                                <Input
                                    id="name"
                                    value={source ?? ''}
                                    onChange={(e) => setSource(e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="amount" className="text-right">
                                    Valor
                                </Label>
                                <Input

                                    id="amount"
                                    value={amount ?? ''}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Salvar</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

        </>
    )
}
