"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { FormEvent, useState } from "react"
import api from '@/api/get';
import { redirect } from "next/navigation"
export function SignInForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {

    const [email, setEmail] = useState('samuca@gmail.com');
    const [password, setPassword] = useState('123456');
    const [error, setError] = useState('');
    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        const result = await api.signIn(email, password)
        console.log(result);
        if (!result.success) {
            setError(result.message);
        } else {

            redirect('dashboard')
        }



    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Seja bem-vindo(a)</CardTitle>
                    <CardDescription>
                        Faça seu login
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin}>
                        <div className="grid gap-6">

                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">E-mail</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        required
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Senha</Label>
                                        <a
                                            href="#"
                                            className="ml-auto text-sm underline-offset-4 hover:underline"
                                        >
                                            Esqueceu sua senha?
                                        </a>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </div>
                                <Button type="submit" className="w-full cursor-pointer">
                                    Entrar
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                Não tem uma conta?{" "}
                                <Link href={'/signup'} className="underline underline-offset-4"> Cadastre-se</Link>

                            </div>
                        </div>

                    </form>
                </CardContent>
            </Card>
            {/* <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div> */}
        </div>
    )
}
