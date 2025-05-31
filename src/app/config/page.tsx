"use client"
import { AppSidebar } from "@/components/sistema/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarSeparator, SidebarTrigger } from "@/components/ui/sidebar"
import { useCallback, useEffect, useState } from "react"
import api from "@/api/get"
import { User } from "@/types/User"
import { CardWithForm } from "@/components/sistema/cart-user"
import { Category } from "@/types/Category"
import { CardCatForm } from "@/components/sistema/cart-category"
import { ModeToggle } from "@/components/sistema/toggle"

export default function Page() {
    const [user, setUser] = useState<User>();
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState<Category[]>([]);

    const fetchData = useCallback(async () => {
        const itemData = await api.getUser('');
        setUser(itemData.user);
        setCategories(itemData.categories);
        setLoading(false);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/signin';
        } else {
            setToken(token);
        }
    }, []);

    useEffect(() => {
        if (!token) return;
        fetchData();
    }, [token, fetchData]);

    if (loading) return <div className="w-screen h-screen flex justify-center items-center text-2xl">Carregando...</div>;

    return (
        <SidebarProvider>

            {user && <AppSidebar variant="inset" user={user} />}
            <SidebarInset>
                <SidebarTrigger className="-ml-1" />
                <div className="flex flex-col flex-1">
                    <div className="flex flex-col gap-4 p-6">
                        <h1 className="text-3xl">Configurações</h1>
                        <SidebarSeparator />
                        <div className="grid place-content-center gap-2 sm:grid-cols-1 md:grid-cols-2">
                            <div>
                                <h2 className="mb-1.5">Usuário</h2>
                                {user && <CardWithForm user={user} />}
                            </div>
                            <div>
                                <h2 className="mb-1.5">Categorias</h2>
                                {user && (
                                    <CardCatForm
                                        category={categories}
                                        refreshCategories={fetchData}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
