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
import { Expense } from "@/types/Expense"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem
} from "@/components/ui/select"
import { Category } from "@/types/Category"
import { toast } from "sonner"
import { Checkbox } from "../ui/checkbox"
type Props = {
    expenseId: number
    open: boolean
    setOpen: (open: boolean) => void
}

export function ExpenseEditDialog({ expenseId, open, setOpen }: Props) {

    const [id, setId] = useState(0);
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("")
    const [categoryId, setCategoryId] = useState(0);

    const [categorias, setCategorias] = useState<Category[]>([]);
    const [itemExpense, setItemExpense] = useState<Expense>();
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<Category | null>(null);
    const [isFixed, setIsFixed] = useState(false);
    useEffect(() => {
        const loadData = async () => {
            if (!open) return;

            const [catResp, expResp] = await Promise.all([
                api.getCategory(),
                api.getOneExpense(expenseId),
            ]);

            const categoriasData = catResp?.original?.data ?? [];
            const expenseData = expResp?.original?.data?.[0];

            setCategorias(categoriasData);
            setItemExpense(expenseData);

            if (expenseData) {
                setId(expenseData.id);
                setDescription(expenseData.description || "");
                setAmount(expenseData.amount?.toString() || "");
                setCategoryId(expenseData.category_id);
            }
        };

        loadData();
    }, [open, expenseId]);

    useEffect(() => {
        if (!open) return;

        if (itemExpense && categorias.length > 0) {
            const categoria = categorias.find(c => c.id === itemExpense.category_id);

            if (!categoria) {
                console.warn("Categoria não encontrada para:", itemExpense);
            } else {
                setCategoriaSelecionada(categoria);
                setId(itemExpense.id);
                setDescription(itemExpense.description || "");
                setAmount(itemExpense.amount?.toString() || "");
                setCategoryId(itemExpense.category_id);
                setIsFixed(itemExpense.fixed_expenses)
            }
        }
    }, [itemExpense, categorias, open]);


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();


        const update = await api.updateExpense(
            id,
            description,
            parseFloat(amount),
            categoryId,
            isFixed
        )
        console.log(update);
        toast.success(`Despesa Atualizada com sucesso!`)
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
                        {itemExpense && categorias.length > 0 ? (
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Descrição
                                    </Label>
                                    <Input
                                        id="name"
                                        value={description ?? ''}
                                        onChange={(e) => setDescription(e.target.value)}
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
                                <div className="flex gap-3">

                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Conta fixar?
                                    </label>
                                    <Checkbox
                                        id="terms"
                                        checked={isFixed}
                                        onCheckedChange={(checked) => setIsFixed(!!checked)}
                                    />
                                </div>

                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="category" className="text-right">
                                        Categoria
                                    </Label>

                                    <Select
                                        value={categoryId ? categoryId.toString() : ""}
                                        onValueChange={(value) => setCategoryId(parseInt(value))}
                                    >
                                        <SelectTrigger>

                                            <SelectValue
                                                id="category"
                                                placeholder="Selecione um tipo de despesa"
                                            >
                                                {categoryId
                                                    ? categorias.find(cat => cat.id === categoryId)?.name ?? ""
                                                    : ""}
                                            </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>

                                                {categorias.map((item) => (

                                                    <SelectItem
                                                        key={item.id}
                                                        value={item.id.toString()}

                                                    >

                                                        {item.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                </div>
                            </div>
                        ) : (
                            <span className="flex justify-center items-center">Carregando...</span>
                        )}
                        <DialogFooter>
                            <Button type="submit">Salvar</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

        </>
    )
}
