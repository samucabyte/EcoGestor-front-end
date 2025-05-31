import { UserFinacialData } from "@/types/UserFinacialData";
import { Rewind } from "lucide-react";
import { redirect } from "next/navigation";
import { any } from "zod";

const getToken = () => localStorage.getItem('token');


const url = 'http://127.0.0.1:8000/api/';

const basicFetch = async (endpoint: string, method: string, body?: any) => {
    try {
        const token = getToken();
        const res = await fetch(`${url}${endpoint}`, {
            method,
            headers: {
                'Authorization': `Bearer ${token}`, // Adiciona o token no cabeçalho
                'Content-Type': 'application/json', // Define o tipo de conteúdo
            },
            body: body ? JSON.stringify(body) : null,
        });
        const json = await res.json();
        return json
    } catch (error) {
        return redirect('/')
    }

};

export const getVery = async () => {
    const token = getToken();
    try {
        const token = getToken();
        const res = await fetch(`${url}auth/verify`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Adiciona o token no cabeçalho
                'Content-Type': 'application/json', // Define o tipo de conteúdo
            }
        });
        const json = await res.json();
        return json
    } catch (error) {
        return redirect('/')
    }

}

export default {
    getUser: async (date: string | "") => {

        return await basicFetch(date === '' ? 'home' : `home?date=${date}`, 'GET');
    },
    signUp: async (name: string, email: string, password: string) => {
        const body = {
            name,
            email,
            password
        }
        const json = await basicFetch('auth/signup', 'POST', body);

        if (json.status !== 'error') {
            localStorage.setItem('token', json.token);
            return { success: true, messase: json }
        } else {
            return {
                success: false,
                message: json || 'Erro ao cadastrar usuario',
            };
        }
    },
    signIn: async (email: string, password: string): Promise<{ success: boolean, message: any }> => {
        const body = { email, password };
        const json = await basicFetch('auth/signin', 'POST', body);

        if (json.status !== 'error') {
            localStorage.setItem('token', json.token);
            return { success: true, message: json };
        } else {
            return {
                success: false,
                message: 'Erro ao fazer login',
            };
        }
    },
    getIncome: async () => {
        const { json } = await basicFetch('income', 'GET');
        return json;
    },
    getOneIncome: async (incomeId: number) => {
        const json = await basicFetch(`income/${incomeId}`, 'GET');
        return json;
    },
    createIncome: async (source: string, amount: number) => {
        const body = {
            source,
            amount,
            user_id: getVery(),
            created_at: new Date()
        }
        const json = await basicFetch('income', 'POST', body);

        if (json.original.status === 'success') {
            return { success: true, json }
        } else {
            return {
                success: false,
                message: json.message || 'Erro, tente mais tarde'
            }
        }
    },
    updateIncome: async (incomeId: number, source: string, amount: number) => {
        const body = {
            source,
            amount,
            user_id: getVery(),
        };

        const json = await basicFetch(`income/${incomeId}`, 'PUT', body);
        if (json.original.status === 'success') return json;
    },
    deleteIncome: async (incomeId: number) => {
        const json = await basicFetch(`income/${incomeId}`, 'DELETE');
        return;
    },
    createExpense: async (description: string, amount: number, category: number, isFixed: boolean) => {

        const body = {
            description,
            amount,
            category_id: category,
            fixed_expenses: isFixed,
            user_id: getVery(),
            created_at: new Date(),
        };

        const { json, ok } = await basicFetch('expense', 'POST', body);

        if (ok) {
            console.log("Expense created successfully:", json);
        }
    },

    getOneExpense: async (expenseId: number) => {
        const json = await basicFetch(`expense/${expenseId}`, 'GET');
        if (json.original.status === 'success') return json;
    },
    getFixedExpense: async () => {
        const json = await basicFetch('expense/fixed', 'GET');
        return json;
    },
    getNoFixedExpense: async () => {
        const json = await basicFetch('expense/no-fixed', 'GET');
        return json;
    },

    updateExpense: async (expenseId: number, description: string, amount: number, categoryId: number, isFixed: boolean) => {
        const body = {
            description,
            amount,
            user_id: getVery(),
            category_id: categoryId,
            fixed_expenses: isFixed
        };

        const json = await basicFetch(`expense/${expenseId}`, 'PUT', body);
        return json;
    },

    deleteExpense: async (expenseId: number) => {
        const json = await basicFetch(`expense/${expenseId}`, 'DELETE');
        return json
    },

    getCategory: async () => {
        const json = await basicFetch('category', 'GET');
        return json;
    },
    getOneCategory: async (id: number) => {
        const json = await basicFetch(`category/${id}`, 'GET');
        return json;
    },

    updateCategory: async (id: number, name: string) => {
        const body = { id, name }
        const json = await basicFetch(`category/${id}`, 'PUT', body);
        return json;
    },
    createdCategory: async (name: string) => {
        const body = { name }
        const json = await basicFetch('category', 'POST', body);
        return json
    },
    deleteCategory: async (id: number) => {
        const json = await basicFetch(`category/${id}`, 'DELETE');
        return json
    }


};

