import {
  Activity, BarChart3, Building2, Camera, Cloud, Database, HeartPulse, LifeBuoy, MapPin, Mic, ShieldCheck, Smartphone,
  type LucideProps,
} from "lucide-react";

const MAP = {
  chart: BarChart3,
  phone: Smartphone,
  shield: ShieldCheck,
  building: Building2,
  heart: HeartPulse,
  database: Database,
  pin: MapPin,
  camera: Camera,
  mic: Mic,
  activity: Activity,
  cloud: Cloud,
  lifebuoy: LifeBuoy,
} as const;

export type IconName = keyof typeof MAP;

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const C = MAP[name as IconName] ?? BarChart3;
  return <C aria-hidden="true" {...props} />;
}

/** O Lucide já não inclui ícones de marcas. */
export function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21H9z" />
    </svg>
  );
}
