"use client"
import { AppSidebar } from "@/components/sistema/app-sidebar"
import { ChartAreaInteractive } from "@/components/sistema/chart-area-interactive"
import { TableData } from "@/components/sistema/data-table"
import { SectionCards } from "@/components/sistema/section-cards"
import { SiteHeader } from "@/components/sistema/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { useEffect, useState } from "react"
import api, { getVery } from "@/api/get"
import { UserFinacialData } from "@/types/UserFinacialData"
import { Category } from "@/types/Category"
import { Income } from "@/types/Income"
import { Expense } from "@/types/Expense"
import { User } from "@/types/User"
import { TableDataIncome } from "@/components/sistema/data-table-income"
import { CalendarForm } from "@/components/sistema/calendar"
import { CalendarFormTest } from "@/components/sistema/calendar-test"
export default function Page() {
  const [data, setData] = useState<UserFinacialData>();
  const [user, setUser] = useState<User>();
  const [income, setIncome] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [fixed, setFixed] = useState<Expense[]>([])
  const [noFixed, setNoFixed] = useState<Expense[]>([])
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState("");

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

    const fetchData = async () => {

      const itemData = await api.getUser(date);
      const fixed = await api.getFixedExpense();
      const noFixed = await api.getNoFixedExpense();

      setNoFixed(noFixed.original.data);
      setFixed(fixed.fixed_expenses);
      setData(itemData);
      setUser(itemData.user);
      setIncome(itemData.income);
      setExpenses(itemData.expenses);
      setCategories(itemData.categories);
      setLoading(false);
    };

    fetchData();
  }, [token, date, data, fixed, noFixed, expenses, income]);

  if (loading) return <div className=" text-5xl w-full h-screen flex justify-center items-center">Carregando...</div>;

  return (
    <SidebarProvider>
      {user && <AppSidebar variant="inset" user={user} />}
      <SidebarInset>

        <SiteHeader categories={categories} />
        <CalendarFormTest onDateChange={setDate} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards
                income={income}
                expenses={expenses}
                fixed={fixed}
                noFixed={noFixed}
              />
              <TableData expenses={expenses} />
              <TableDataIncome income={income} />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
