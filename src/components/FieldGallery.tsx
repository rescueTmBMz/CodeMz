import { PHOTOS } from "@/lib/data";

const ITEMS = [
  { p: PHOTOS.rio, pos: "object-[35%_60%]", mobile: "aspect-[4/3]" },
  { p: PHOTOS.chambeluca, pos: "object-[50%_32%]", mobile: "aspect-[4/5]" },
  { p: PHOTOS.natemba, pos: "object-[50%_12%]", mobile: "aspect-[4/5]" },
];

export function FieldGallery() {
  return (
    <ul className="grid gap-4 md:h-[30rem] md:grid-cols-[1.5fr_1fr_1fr] md:gap-5">
      {ITEMS.map(({ p, pos, mobile }) => (
        <li key={p.src} className="min-h-0">
          <figure className="group relative h-full overflow-hidden rounded-2xl bg-navy-900">
            <img
              src={p.src} width={p.width} height={p.height} alt={p.alt} loading="lazy"
              className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 md:aspect-auto md:h-full ${mobile} ${pos}`}
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/90 to-transparent p-5 pt-14 text-sm font-medium text-white">
              {p.caption}
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
