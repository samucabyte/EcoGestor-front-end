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
type Props = {
    user: User
}
export function CardWithForm({ user }: Props) {

    const [name, setName] = React.useState(user.name);

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Editar usuario</CardTitle>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name of your project"
                            />
                        </div>

                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button>Enviar</Button>
            </CardFooter>
        </Card>
    )
}
