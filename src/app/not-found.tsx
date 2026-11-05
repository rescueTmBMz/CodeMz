import Link from "next/link";
export default function NotFound() {
  return (
    <section className="container-x py-32 text-center">
      <p className="font-display text-6xl font-extrabold text-orange">404</p>
      <h1 className="mt-4 text-3xl font-extrabold">Página não encontrada</h1>
      <Link href="/" className="btn btn-primary mt-8">Voltar ao início</Link>
    </section>
  );
}
