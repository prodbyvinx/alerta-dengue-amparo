import FormularioDenuncia from "@/app/_components/formDenuncia";
import ClientMap from "@/app/_components/clientMapa";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

async function getDenuncias() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/denuncias`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function Home() {
  const denuncias = await getDenuncias();
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: todos } = await supabase.from("todos").select();

  return (
    <>
      <h2 className="text-2xl font-semibold mb-2">Lista de Tarefas</h2>
      <ul>
        {todos?.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-4">Alerta Dengue Amparo</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Reportar um Foco</h2>
            <FormularioDenuncia />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Mapa de Ocorrências</h2>
            <ClientMap denuncias={denuncias} />
          </div>
        </div>
      </main>
    </>
  );
}
