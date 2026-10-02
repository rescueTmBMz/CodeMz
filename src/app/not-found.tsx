import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x py-28 text-center">
      <p className="eyebrow justify-center">Erro 404</p>
      <h1 className="mt-4 text-4xl font-extrabold">Página não encontrada</h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-muted">A página que procura não existe ou foi movida.</p>
      <Link href="/" className="btn btn-accent mt-8">Voltar ao início</Link>
    </section>
  );
}
