export type UserFinacialData = {
    user: {
        id: number,
        name: string,
        email: string
    },
    income: Array<{
        id: number,
        source: string,
        amount: number,
        created_at: string
    }>,
    expenses: Array<{
        id: number,
        description: string,
        category_id: number,
        category: string,
        amount: number,
        created_at: string
    }>,
    categories: Array<{
        id: number,
        name: string
    }>
}