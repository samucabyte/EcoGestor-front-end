"use client"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Income } from "@/types/Income";
import { Expense } from "@/types/Expense";

interface SectionCardsProps {
    income: Income[];
    expenses: Expense[];
    fixed: Expense[];
    noFixed: Expense[];
}
export function SectionCards({ income, expenses, fixed, noFixed }: SectionCardsProps) {

    const totalIncome = income.reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    const totalFixedExpense = fixed.reduce((acc, curr) => acc + curr.amount, 0);
    const totalNoFixedExpense = noFixed.reduce((acc, curr) => acc + curr.amount, 0);
    const remainder = totalIncome - totalExpense;
    return (
        <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
            <Card className="@container/card">
                <CardHeader className="relative">
                    <CardDescription>Total de renda</CardDescription>
                    <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                        {totalIncome.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        })}
                    </CardTitle>
                </CardHeader>
            </Card>
            <Card className="@container/card">
                <CardHeader className="relative">
                    <CardDescription>Total de Dispesas Fixas</CardDescription>
                    <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                        {totalFixedExpense.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        })}
                    </CardTitle>
                </CardHeader>
            </Card>
            <Card className="@container/card">
                <CardHeader className="relative">
                    <CardDescription>Total de despesas Gerais</CardDescription>
                    <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                        {totalNoFixedExpense.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        })}
                    </CardTitle>
                </CardHeader>
            </Card>
            <Card className="@container/card">
                <CardHeader className="relative">
                    <CardDescription>Valor final</CardDescription>
                    <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                        {remainder.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        })}
                    </CardTitle>
                </CardHeader>
            </Card>

        </div>
    )
}
