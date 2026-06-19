import { Services } from "@/components/sections/Services";
import { CTA } from "@/components/sections/CTA";

export default function ServicesPage() {
  return (
    <main>
      <div className="pt-24 pb-12 text-center">
        <h1 className="text-4xl font-bold text-white">Nuestros Servicios</h1>
        <p className="text-ink-300 mt-2">
          Soluciones de IA personalizadas para tu negocio
        </p>
      </div>
      <Services />
      <CTA />
    </main>
  );
}