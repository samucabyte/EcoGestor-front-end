"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Category } from "@/types/Category";
import { FormEvent, useEffect, useState } from "react";
import api from "@/api/get";
import { toast } from "sonner";
import { Checkbox } from "../ui/checkbox";

interface SiteHeaderProps {
    categories: Category[];
}
export function InputWithButton({ categories }: SiteHeaderProps) {

    const [Description, setDescription] = useState("test");
    const [amount, setAmount] = useState("10");
    const [category, setCategory] = useState("");
    const [isFixed, setIsFixed] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        await api.createExpense(
            Description,
            parseFloat(amount),
            parseInt(category),
            isFixed
        );
        toast.success(`Depesa adicionada com sucesso!`)
        setDescription("");
        setAmount("");
        setCategory("");
        setIsFixed(false)

    };

    return (
        <div>
            <form method="POST" onSubmit={handleSubmit} className="flex w-full max-w-xl items-center space-x-2">
                <Input
                    type="text"
                    name="Description"
                    placeholder="Descrição"
                    value={Description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <Input
                    type="text"
                    name="amount"
                    placeholder="valor"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}

                />

                <Select value={category} onValueChange={(value) => setCategory(value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>

                            {categories.map((item) => (
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
                <Checkbox
                    id="terms"
                    checked={isFixed}
                    onCheckedChange={(checked) => setIsFixed(!!checked)}
                />
                <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Conta fixar?
                </label>
                <Button type="submit">Adicionar</Button>
            </form>
        </div>
    )
}