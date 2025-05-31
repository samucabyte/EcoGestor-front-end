import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { User } from "@/types/User"
import { Category } from "@/types/Category"
import api from '@/api/get'
import { redirect } from "next/navigation"
import { ForkOptions } from "node:child_process"
import { SonnerDemo } from "@/components/sistema/Toast"
import { toast } from "sonner";
import { SidebarSeparator } from "../ui/sidebar"
type Props = {
    category: Category[],
    refreshCategories: () => void
}
export function CardCatForm({ category, refreshCategories }: Props) {


    const [categorias, setCategories] = React.useState<Category[]>(category);
    const [name, setName] = React.useState('');

    React.useEffect(() => {
        setCategories(category);
    }, [category]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // percorre o array original e compara com o editado
        for (const original of category) {
            const editado = categorias.find(cat => cat.id === original.id);

            // se o nome mudou, atualiza
            if (editado && original.name !== editado.name) {
                await api.updateCategory(editado.id, editado.name);
                toast.success(`Categoria "${original.name}" atualizada para "${editado.name}".`);
            }
        }
        refreshCategories();

    }
    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault()
        const novaCategoria = await api.createdCategory(name);
        setCategories((prev) => [...prev, novaCategoria])
        toast.success(`Categoria "${name}" adicionada.`)
        setName('');
        window.location.reload();
    }

    const handleDelite = async (e: React.FormEvent, id: number, name: string) => {
        e.preventDefault()
        await api.deleteCategory(id);
        toast.success(`Categoria "${name}" deletada`)
        refreshCategories();
    }
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Adicionar, Editar ou Deletar uma categorias</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent>

                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col justify-center gap-1 space-y-1.5">
                            <Label>Atualizar categorias</Label>
                            {categorias.map((item, index) => (
                                <div key={item.id ?? `categoria-temp-${index}`} className="flex justify-around items-center">
                                    <Input
                                        id={`categoria-${item.id ?? `temp-${index}`}`}
                                        value={item.name}
                                        onChange={(e) => {
                                            const newCategories = [...categorias];
                                            newCategories[index] = { ...newCategories[index], name: e.target.value };
                                            setCategories(newCategories);
                                        }}
                                    />

                                    <Button variant={"destructive"} className=" cursor-pointer" onClick={(e) => handleDelite(e, item.id, item.name)}>deletar</Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button className="mt-3 cursor-pointer border-t-2">Enviar</Button>
                </CardFooter>
            </form>
            <form onSubmit={handleAdd}>
                <div className="mt-5 flex items-center">
                    <div className="">

                        <Input

                            placeholder="Escreva uma nova categoria"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <Button variant={"secondary"} className=" cursor-pointer border-t-2">adicionar</Button>
                </div>
            </form>

        </Card>
    )
}
