import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Instagram, Facebook, Mail, PhoneCall, MessageCircle, Images,
  ChevronRight, Handshake, Rocket, Shield, BadgeCheck, Hammer, Leaf, Sparkles,
  Copy, Check
} from "lucide-react";

/* ===== Colores ===== */
const colors = {
  bgFrom: "#0f3d29",
  bgTo:   "#0a2c20",
  brand:  "#22c55e",
  brandAlt: "#86efac",
  text: "#f8fafc",
  muted: "#cbd5e1",
};

/* ===== Animaciones ===== */
const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" },
};
const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };
const child   = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

/* ===== Ruta del fondo del hero (dentro de public/) ===== */
const HERO_BG = "/images/gallery/prueba.png";

/* ========================== */
/*   Helpers de Donaciones    */
/* ========================== */

function Field({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs uppercase tracking-wide text-slate-300">{label}</div>
      <div className="mt-1 font-medium text-slate-100">{value}</div>
    </div>
  );
}

function BankDonationCard({ bankLogo, bankName, holder, accountType, accountNumber, note }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
      <div className="mb-6 flex items-center gap-4">
        <img
          src={bankLogo}
          alt={bankName}
          className="h-12 w-12 rounded-md bg-white/90 p-1 object-contain"
        />
        <div>
          <div className="text-lg font-semibold text-slate-100">{bankName}</div>
          {note && <p className="text-sm text-slate-300">{note}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Titular de la Cuenta - Líder Técnico" value={holder} />
        <Field label="Tipo de cuenta" value={accountType} />
        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-emerald-500/10 p-4">
          <div>
            <div className="text-xs uppercase tracking-wide text-emerald-300">Número de cuenta</div>
            <div className="font-mono text-lg text-slate-100">{accountNumber}</div>
          </div>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 rounded-lg border border-emerald-400/40 px-3 py-2 text-emerald-200 hover:bg-emerald-400/10"
            aria-label="Copiar número de cuenta"
          >
            {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
            <span className="text-sm">{copied ? "Copiado" : "Copiar"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===== Marquee de patrocinadores (loop continuo) ===== */
function SponsorsMarquee() {

  const logos = [
    "/images/Patrocinadores/AMEGUA.png",
    "/images/Patrocinadores/AgregadosSanJosé.png",
    "/images/Patrocinadores/UNO.png",
    "/images/Patrocinadores/UVG.png",
    "/images/Patrocinadores/FibraFina.png",
    "/images/Patrocinadores/Shell.png",
    "/images/Patrocinadores/Alfredosb.png",
  ];


  const track = [...logos, ...logos];

  return (
    <section className="mt-10">
      <h3 className="mb-4 text-2xl font-bold text-emerald-300">Patrocinadores actuales</h3>

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 py-6">
   
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[rgba(10,44,32,0.9)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[rgba(10,44,32,0.9)] to-transparent" />


        <motion.div
          className="flex items-center whitespace-nowrap gap-12" 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 5, ease: "linear", repeat: Infinity }}
          style={{ willChange: "transform" }}
        >
          {track.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Logo patrocinador ${i + 1}`}
              className="h-24 w-auto object-contain transition-transform grayscale hover:grayscale-0"
              loading="lazy"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}


/* ===== Navbar ===== */
function Navbar() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 200], [0.0, 0.9]);
  return (
    <motion.header
      style={{ backgroundColor: `rgba(10,44,32,${bgOpacity.get()})`, backdropFilter: "saturate(180%) blur(8px)" }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href="#inicio" className="group inline-flex items-center gap-2 font-extrabold tracking-wide text-slate-100">
          <span className="h-6 w-6 rounded-md bg-gradient-to-br from-emerald-500 to-emerald-300 shadow-md transition-transform group-hover:rotate-6" />
          TAQ'BALAM
        </a>
        <nav className="hidden items-center gap-4 text-slate-200/90 md:flex">
          <a href="#nosotros"  className="rounded-full px-3 py-1 hover:bg-white/10">Nosotros</a>
          <a href="#galeria"   className="rounded-full px-3 py-1 hover:bg-white/10">Fotogalería</a>
          <a href="#futuro"    className="rounded-full px-3 py-1 hover:bg-white/10">A futuro</a>
          <a href="#patrocinio" className="rounded-full px-3 py-1 hover:bg-white/10">Patrocinio</a>
          <a href="#contacto"  className="rounded-full px-3 py-1 hover:bg-white/10">Contacto</a>
        </nav>
        <a href="https://wa.me/50239046455" target="_blank" rel="noreferrer"
           className="hidden rounded-full bg-emerald-500 px-4 py-2 font-semibold text-emerald-950 shadow md:inline-flex hover:bg-emerald-400">
          Conversemos
        </a>
        <button className="md:hidden rounded-xl border border-white/15 p-2 text-slate-100">☰</button>
      </div>
    </motion.header>
  );
}

/* ===== Hero con imagen de fondo difuminada ===== */
function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden pt-28 text-slate-50"
      style={{
        backgroundImage: `url(${HERO_BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      <div className="absolute inset-0 -z-0 bg-emerald-950/65 backdrop-blur-[2px]" />
      <div className="mx-auto max-w-6xl px-4 py-16 relative z-10">
        <motion.p {...fadeUp} className="text-emerald-300/90 font-bold uppercase tracking-[.2em]">
          Vehículos eficientes e Innovación energética
        </motion.p>
        <motion.h1 {...fadeUp} transition={{ ...fadeUp.transition, delay: .05 }}
                   className="mt-2 text-4xl font-black leading-tight sm:text-6xl">
          Taq'Balam
        </motion.h1>
        <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: .1 }}
                  className="mt-3 max-w-2xl text-lg text-slate-200">
          Creando soluciones sostenibles en Guatemala.
        </motion.p>
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: .18 }}
                    className="mt-6 flex flex-wrap items-center gap-3">
          <a href="mailto:taqbalam1@gmail.com?subject=Inter%C3%A9s%20en%20patrocinio%20Taq%20Balam"
             className="group inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 font-semibold text-emerald-950 shadow hover:bg-emerald-400">
            Ser patrocinador <ChevronRight className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <a href="#galeria" className="rounded-full border border-white/15 px-5 py-3 font-semibold text-slate-100 hover:bg-white/10">
            Ver fotogalería
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ===== Nosotros ===== */
function Nosotros() {
  return (
    <section id="nosotros" className="relative mx-auto max-w-6xl px-4 py-16 text-slate-50">
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-20%" }}>
        <motion.h2 variants={child} className="text-3xl font-extrabold tracking-tight sm:text-4xl">Nosotros</motion.h2>
        <motion.div variants={child} className="mt-4 grid gap-8 md:grid-cols-2">
          <div className="space-y-4 leading-relaxed text-slate-200">
            <p><strong>Taq Balam</strong> es un proyecto innovador de la Universidad del Valle de Guatemala (UVG), donde un grupo de jóvenes universitarios desarrolla un carro eléctrico como propuesta de investigación y sostenibilidad.</p>
            <p>Desde 2010, con el respaldo del Instituto de Investigaciones UVG y el departamento de Química, hemos representado a Guatemala en competencias internacionales, siendo el único equipo centroamericano en participar, junto a países como Estados Unidos, México, Canadá y Brasil.</p>
            <p>Nuestro objetivo es demostrar que la energía limpia y la movilidad eléctrica pueden impulsar un futuro más sostenible para la región.</p>
          </div>
          <div className="grid content-start gap-6">
            <Feature icon={<Rocket />} title="Competitividad" desc="Más de una década impulsando eficiencia energética." />
            <Feature icon={<Shield />} title="Sostenibilidad" desc="Diseños orientados a impacto ambiental positivo." />
            <Feature icon={<BadgeCheck />} title="Excelencia" desc="Premiaciones y distinciones en Shell Eco Marathon." />
          </div>
        </motion.div>
      </motion.div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <CardKicker icon={<Sparkles />} title="Misión"
          desc="Ser un equipo competitivo, organizado y multidisciplinario, que impulse la innovación en movilidad eléctrica y genere un impacto positivo en la sociedad." />
        <CardKicker icon={<Leaf />} title="Visión"
          desc="Consolidarnos como un equipo referente en Latinoamérica, reconocido por desarrollar prototipos eléctricos eficientes, modernos y sostenibles, que contribuyan al bienestar social y ambiental." />
      </div>
    </section>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <motion.div {...fadeUp} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">{icon}</div>
      <div>
        <div className="font-semibold">{title}</div>
        <p className="text-sm text-slate-300">{desc}</p>
      </div>
    </motion.div>
  );
}
function CardKicker({ icon, title, desc }) {
  return (
    <motion.article {...fadeUp} className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6">
      <div className="mb-2 flex items-center gap-2 text-emerald-300">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20">{icon}</span>
        <h3 className="text-xl font-bold text-slate-50">{title}</h3>
      </div>
      <p className="text-slate-200/90">{desc}</p>
    </motion.article>
  );
}

/* ===== Galería ===== */
function Galeria() {
  const images = [
    "/images/gallery/img1.jpeg",
    "/images/gallery/img2.jpeg",
    "/images/gallery/img3.jpeg",
    "/images/gallery/img4.jpg",
    "/images/gallery/img5.jpg",
    "/images/gallery/img6.jpg",
  ];
  return (
    <section id="galeria" className="mx-auto max-w-6xl px-4 py-16 text-slate-50">
      <motion.h2 {...fadeUp} className="text-3xl font-extrabold tracking-tight sm:text-4xl">Fotogalería</motion.h2>
      <motion.p {...fadeUp} className="mt-2 max-w-2xl text-slate-300">Momentos de trabajo, pruebas y competencia.</motion.p>
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10%" }}
                  className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {images.map((src, i) => (
          <motion.a key={i} variants={child} href={src} target="_blank" rel="noreferrer"
                    className="group relative block overflow-hidden rounded-xl border border-white/10 bg-white/5">
            <img src={src} alt={`Foto ${i + 1}`}
                 className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                 loading="lazy" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}

/* ===== A futuro ===== */
function Futuro() {
  return (
    <section id="futuro" className="mx-auto max-w-6xl px-4 py-16 text-slate-50">
      <motion.h2 {...fadeUp} className="text-3xl font-extrabold tracking-tight sm:text-4xl">A futuro</motion.h2>
      <motion.div {...fadeUp} className="mt-4 grid gap-6 md:grid-cols-2 items-start">
        <div className="space-y-4 leading-relaxed text-slate-200">
          <p>Para la temporada 2025 presentaremos un vehículo renovado y optimizado, incorporando innovaciones en materiales, aerodinámica y tecnologías propias.</p>
          <p>Además, estamos proyectando el desarrollo de un prototipo urbano con hidrógeno verde, reafirmando nuestro compromiso con la movilidad sostenible.</p>
          <p>Nuestro siguiente gran reto será en abril de 2026, cuando participaremos en la Shell Eco-Marathon Americas, una de las competencias de eficiencia energética más importantes del mundo, donde buscaremos dejar en alto el nombre de Guatemala y Centroamérica.</p>
        </div>
        <motion.div {...fadeUp} className="self-start rounded-2xl border border-white/10 bg-white/5 p-6">
          <ul className="space-y-3 text-slate-200">
            <li className="flex items-center gap-2"><Hammer className="text-emerald-300" /> Materiales ultraligeros y rediseño del monocasco</li>
            <li className="flex items-center gap-2"><Images className="text-emerald-300" /> Aerodinámica y rendimiento mejorados</li>
            <li className="flex items-center gap-2"><Leaf className="text-emerald-300" /> Prototipo urbano con hidrógeno verde</li>
            <li className="flex items-center gap-2"><Sparkles className="text-emerald-300" /> Tecnologías de desarrollo propio</li>
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ===== Patrocinio ===== */
function Patrocinio() {
  const bullets = [
    { title: "Impacto social y ambiental", desc: "Impulsa soluciones sostenibles que benefician a Guatemala y la región." },
    { title: "Visibilidad internacional", desc: "Proyección en competencias de alto nivel como la Shell Eco-Marathon Americas." },
    { title: "Desarrollo de talento", desc: "Apoya la formación de futuros líderes en ingeniería, innovación y sostenibilidad." },
    { title: "Innovación tecnológica", desc: "Participa en la creación de prototipos con eficiencia energética y materiales ecológicos." },
    { title: "Responsabilidad social empresarial (RSE)", desc: "Refuerza el compromiso de tu organización con la educación, el medio ambiente y la comunidad." },
  ];
  const formas = ["Patrocinio financiero", "Donación de materiales o equipos", "Asesoría técnica o empresarial", "Difusión y promoción del proyecto"];

  return (
    <section id="patrocinio" className="mx-auto max-w-6xl px-4 py-16 text-slate-50">
      <motion.h2 {...fadeUp} className="text-3xl font-extrabold tracking-tight sm:text-4xl">¡Tú también puedes ser parte!</motion.h2>
      <motion.p {...fadeUp} className="mt-2 max-w-3xl text-slate-300">
        En Taq Balam buscamos patrocinadores visionarios que quieran impulsar la innovación, la sostenibilidad y el talento guatemalteco.
      </motion.p>

      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-6 grid gap-6 md:grid-cols-2">
        <motion.div variants={child} className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="mb-3 flex items-center gap-2 text-emerald-300"><Handshake /> <span className="font-semibold">¿Por qué patrocinar a Taq Balam?</span></div>
          <ul className="space-y-3 text-slate-200">
            {bullets.map((b, i) => (
              <li key={i} className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="font-semibold">{b.title}</div>
                <div className="text-sm text-slate-300">{b.desc}</div>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={child} className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="mb-3 font-semibold text-emerald-300">Formas de unirte</div>
          <ul className="grid gap-3">
            {formas.map((f, i) => (
              <li key={i} className="flex items-center gap-2 rounded-xl border border-white/10 bg-emerald-500/10 p-3 text-slate-100">
                <ChevronRight className="text-emerald-300" /> {f}
              </li>
            ))}
          </ul>
          <a href="mailto:taqbalam1@gmail.com?subject=Inter%C3%A9s%20en%20patrocinio%20Taq%20Balam"
             className="mt-5 inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-3 font-semibold text-emerald-950 shadow hover:bg-emerald-400">
            Ser patrocinador
          </a>
        </motion.div>
      </motion.div>

      <motion.div {...fadeUp} className="mt-8">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">

          <h3 className="mb-4 text-2xl font-bold text-emerald-300">
            Donación por transferencia bancaria
          </h3>

          <p className="mb-5 max-w-3xl text-slate-200">
            Si deseas apoyar nuestra misión de innovación sostenible, puedes realizar una donación por transferencia. Tu aporte impulsa a estudiantes guatemaltecos a construir tecnología con impacto social.
          </p>

          <BankDonationCard
            bankLogo="/images/gallery/bi.png"     
            bankName="Banco Industrial"
            holder="Emanuel Alfredo Sandoval Yax"
            accountType="Cuenta Monetaria"
            accountNumber="0170156335"
            note="Gracias por confiar en nuestro trabajo. Cada contribución nos acerca a la próxima meta."
          />
        </div>
      </motion.div>
      <SponsorsMarquee />
    </section>
  );
}

/* ===== Contacto ===== */
function Contacto() {
  const iconClass = "h-7 w-7";
  const social = [
    { href: "https://www.instagram.com/taqbalam?igsh=ZmRoNjllMHNoeWIw&utm_source=qr", label: "Instagram", icon: <Instagram className={iconClass}/> },
    /* { href: "#", label: "Facebook",  icon: <Facebook  className={iconClass} /> }, */
    { href: "mailto:taqbalam1@gmail.com?subject=Inter%C3%A9s%20en%20patrocinio%20Taq%20Balam", label: "Correo", icon: <Mail className={iconClass} /> },
    { href: "https://wa.me/50239046455", label: "WhatsApp", icon: <MessageCircle className={iconClass} /> },
    { href: "tel:+50239046455", label: "Teléfono", icon: <PhoneCall className={iconClass} /> },
  ];
  return (
    <section id="contacto" className="mx-auto max-w-6xl px-4 py-16 text-slate-50">
      <motion.h2 {...fadeUp} className="text-3xl font-extrabold tracking-tight sm:text-4xl">Contacto</motion.h2>
      <motion.p {...fadeUp} className="mt-2 max-w-3xl text-slate-300">
        Contacta con nosotros para discutir las opciones de patrocinio y cómo podemos trabajar juntos para impulsar un futuro más sostenible.
      </motion.p>
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-6 flex flex-wrap items-center gap-3">
        {social.map((s, i) => (
          <motion.a key={i} variants={child} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                    className="group inline-flex items-center gap-2 rounded-2xl border border-emerald-400/50 bg-emerald-400/10 px-4 py-3 text-emerald-200 hover:bg-emerald-400/20">
            <span className="relative inline-flex h-6 w-6 items-center justify-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/40" />
              <span className="relative">{s.icon}</span>
            </span>
            <span className="font-semibold">{s.label}</span>
          </motion.a>
        ))}
      </motion.div>
      <motion.footer {...fadeUp} className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-4 text-center text-sm text-slate-300">
        © {new Date().getFullYear()} Taq'Balam Guatemala. Todos los derechos reservados.
      </motion.footer>
    </section>
  );
}

/* ===== App ===== */
export default function TaqBalamLanding() {
  return (
    <div className="min-h-screen w-full scroll-smooth bg-gradient-to-b from-[var(--from)] to-[var(--to)]"
         style={{ ["--from"]: colors.bgFrom, ["--to"]: colors.bgTo }}>
      <Navbar />
      <main>
        <Hero />
        <Nosotros />
        <Galeria />
        <Futuro />
        <Patrocinio />
        <Contacto />
      </main>
    </div>
  );
}
