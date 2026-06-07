import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Sparkles, Star, Phone, MapPin, Clock, MessageCircle,
  ChevronDown, Menu, X, Check, Heart, Brush, Eye, Smile,
  Hand, Droplets, Leaf, Scissors, Award, ArrowRight,
} from "lucide-react";

import hero from "@/assets/hero.jpg";
import diana from "@/assets/diana.jpg";
import sCejas from "@/assets/srv-cejas.jpg";
import sOjos from "@/assets/srv-ojos.jpg";
import sLabios from "@/assets/srv-labios.jpg";
import sMicro from "@/assets/srv-microblading.jpg";
import sMani from "@/assets/srv-manicura.jpg";
import sFacial from "@/assets/srv-facial.jpg";
import sCorporal from "@/assets/srv-corporal.jpg";
import sDepil from "@/assets/srv-depilacion.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const WHATSAPP = "https://wa.me/34665193161?text=Hola%20DM%20Art%20Beauty%2C%20me%20gustar%C3%ADa%20reservar%20una%20cita";
const PHONE = "tel:+34665193161";

const nav = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#sobre", label: "Sobre Diana" },
  { href: "#resultados", label: "Transformaciones" },
  { href: "#opiniones", label: "Opiniones" },
  { href: "#contacto", label: "Contacto" },
];

const services = [
  { img: sCejas, icon: Brush, title: "Micropigmentación de Cejas", desc: "Diseño personalizado para conseguir unas cejas definidas, naturales y equilibradas." },
  { img: sOjos, icon: Eye, title: "Micropigmentación de Ojos", desc: "Softliner, eyeliner y entrepestaña para potenciar la mirada sin maquillaje diario." },
  { img: sLabios, icon: Smile, title: "Micropigmentación de Labios", desc: "Color, definición y armonía para unos labios más atractivos y naturales." },
  { img: sMicro, icon: Sparkles, title: "Microblading", desc: "Técnica pelo a pelo para unas cejas perfectas y de aspecto totalmente natural." },
  { img: sMani, icon: Hand, title: "Manicura y Pedicura", desc: "Cuidados profesionales para manos y pies impecables y perfectamente cuidados." },
  { img: sFacial, icon: Droplets, title: "Tratamientos Faciales", desc: "Hidratación, rejuvenecimiento y cuidado profundo de la piel adaptado a ti." },
  { img: sCorporal, icon: Leaf, title: "Tratamientos Corporales", desc: "Tratamientos orientados al bienestar y la belleza corporal en cada sesión." },
  { img: sDepil, icon: Scissors, title: "Depilación, Cejas y Pestañas", desc: "Servicios complementarios para una imagen completa y siempre impecable." },
];

const galleryCats = ["Todos", "Cejas", "Ojos", "Labios", "Microblading", "Manicura"] as const;
const gallery = [
  { src: sCejas, cat: "Cejas", h: "tall" },
  { src: sLabios, cat: "Labios", h: "short" },
  { src: sOjos, cat: "Ojos", h: "tall" },
  { src: sMicro, cat: "Microblading", h: "short" },
  { src: sMani, cat: "Manicura", h: "tall" },
  { src: sCejas, cat: "Cejas", h: "short" },
  { src: sOjos, cat: "Ojos", h: "short" },
  { src: sLabios, cat: "Labios", h: "tall" },
];

const testimonials = [
  { text: "La atención fue excelente y el resultado superó mis expectativas.", name: "María L." },
  { text: "Diana entendió perfectamente lo que necesitaba y el resultado quedó precioso.", name: "Laura G." },
  { text: "Profesionalidad, limpieza y muchísima confianza desde el primer momento.", name: "Carmen R." },
  { text: "Ahora no puedo imaginar mis cejas sin este tratamiento.", name: "Ana M." },
];

const faqs = [
  { q: "¿La micropigmentación duele?", a: "Aplicamos anestesia tópica que minimiza por completo las molestias. La mayoría de clientas describen la sensación como muy llevadera." },
  { q: "¿Cuánto dura el resultado?", a: "El resultado se mantiene entre 1 y 3 años en función del tipo de piel, hábitos y exposición solar." },
  { q: "¿Cuándo necesito un retoque?", a: "Recomendamos un primer retoque entre las 4 y 8 semanas para fijar el color, y un mantenimiento anual." },
  { q: "¿Cómo sé qué diseño me favorece?", a: "Antes de comenzar realizamos un diseño previo personalizado teniendo en cuenta la simetría, forma del rostro y tus preferencias." },
  { q: "¿Puedo resolver dudas antes de reservar?", a: "Por supuesto. Puedes escribirnos por WhatsApp o llamarnos y resolveremos todas tus dudas sin compromiso." },
  { q: "¿Hay contraindicaciones?", a: "Existen algunas contraindicaciones (embarazo, ciertos tratamientos médicos…). Valoramos cada caso de forma personalizada antes de la cita." },
];

function useScrolled() {
  const [s, setS] = useState(false);
  useEffect(() => {
    const onScroll = () => setS(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return s;
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setV(true), io.disconnect()),
      { threshold: 0.2 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return { ref, v };
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const { ref, v } = useInView<HTMLDivElement>();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!v) return;
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [v, to]);
  return (
    <div ref={ref} className="font-display text-5xl md:text-6xl text-foreground">
      {n}
      <span className="text-[var(--gold)]">{suffix}</span>
    </div>
  );
}

function Header() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-[0_4px_30px_-15px_rgba(0,0,0,0.1)]"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="container-x flex items-center justify-between py-4">
        <a href="#inicio" className="flex items-center gap-2">
          <span className="font-display text-2xl tracking-tight">
            DM <span className="text-[var(--gold)]">Art</span> Beauty
          </span>
        </a>
        <nav className="hidden lg:flex items-center gap-9">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-sm text-foreground/80 hover:text-[var(--gold)] transition-colors relative group">
              {n.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--gold)] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="hidden sm:inline-flex btn-gold btn-gold-hover">
            Reservar cita
          </a>
          <button aria-label="Menu" className="lg:hidden p-2" onClick={() => setOpen((o) => !o)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden glass border-t border-border">
          <div className="container-x py-6 flex flex-col gap-4">
            {nav.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="text-foreground/80 py-1">
                {n.label}
              </a>
            ))}
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-gold btn-gold-hover w-fit">
              Reservar cita
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={hero} alt="Cliente con micropigmentación natural en Barcelona" className="absolute inset-0 w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-white/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent" />
      </div>
      <div className="container-x relative z-10 py-32 md:py-40">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-up">
            <Star size={14} className="fill-[var(--gold)] text-[var(--gold)]" />
            <span className="text-xs tracking-wider text-foreground/80">
              Más de 100 clientas satisfechas en Barcelona
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.05] text-foreground animate-fade-up delay-100">
            Realza tu <em className="text-[var(--gold)] font-normal">belleza natural</em> con resultados que duran
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl animate-fade-up delay-200">
            Especialistas en micropigmentación, microblading, cejas, labios, manicura y tratamientos estéticos personalizados en Barcelona.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 animate-fade-up delay-300">
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-gold btn-gold-hover">
              <MessageCircle size={18} /> Reservar por WhatsApp
            </a>
            <a href="#resultados" className="btn-outline-gold">
              Ver resultados <ArrowRight size={16} />
            </a>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-foreground/75 animate-fade-up delay-400">
            {[
              "Atención personalizada",
              "Resultados naturales",
              "+100 valoraciones positivas",
              "Especialistas en micropigmentación",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check size={16} className="text-[var(--gold)]" /> {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <a href="#trust" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--gold)] animate-fade-in delay-400" aria-label="Scroll">
        <ChevronDown className="animate-bounce" />
      </a>
    </section>
  );
}

function TrustStats() {
  const stats = [
    { n: 105, s: "+", l: "Opiniones verificadas" },
    { n: 48, s: "", l: "Valoración 4.8 / 5" },
    { n: 100, s: "%", l: "Atención personalizada" },
    { n: 8, s: "+", l: "Años de experiencia" },
  ];
  return (
    <section id="trust" className="py-20 bg-[var(--beige)]">
      <div className="container-x grid grid-cols-2 md:grid-cols-4 gap-10">
        {stats.map((s) => (
          <div key={s.l} className="text-center">
            <Counter to={s.n} suffix={s.s} />
            <p className="mt-3 text-sm tracking-wider uppercase text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="sobre" className="py-28 md:py-36">
      <div className="container-x grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="absolute -inset-4 bg-[var(--nude)]/40 rounded-2xl -rotate-2" />
          <img src={diana} alt="Diana, especialista de DM Art Beauty Barcelona" className="relative rounded-2xl shadow-[var(--shadow-elegant)] object-cover w-full aspect-[4/5]" loading="lazy" />
          <div className="absolute -bottom-6 -right-4 glass rounded-2xl px-6 py-5 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-2">
              <Award className="text-[var(--gold)]" size={20} />
              <span className="font-display text-xl">Diana</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Especialista en micropigmentación</p>
          </div>
        </div>
        <div>
          <span className="eyebrow">Sobre DM Art Beauty</span>
          <h2 className="font-display text-4xl md:text-5xl mt-4 leading-tight">
            Belleza, precisión y confianza en cada detalle
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            En DM Art Beauty creemos que la belleza va mucho más allá de la estética. Nuestro objetivo es ayudarte a sentirte mejor contigo misma a través de tratamientos personalizados diseñados para potenciar tu belleza natural.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Cada rostro es único y cada tratamiento se adapta cuidadosamente para conseguir resultados armónicos, elegantes y duraderos.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "Trato cercano y personalizado",
              "Asesoramiento profesional",
              "Especialización en micropigmentación",
              "Resultados adaptados a cada rostro",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[var(--beige)] flex items-center justify-center">
                  <Check size={14} className="text-[var(--gold)]" />
                </span>
                <span className="text-foreground/85">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="servicios" className="py-28 bg-[var(--beige)]">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="eyebrow">Nuestros servicios</span>
          <h2 className="font-display text-4xl md:text-5xl mt-4">
            Tratamientos diseñados para realzar tu belleza
          </h2>
          <p className="mt-4 text-muted-foreground">
            Cada técnica se adapta a ti, a tu rostro y a tus deseos para conseguir un resultado único y natural.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <article key={s.title} className="group bg-white rounded-2xl overflow-hidden hover-lift">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center">
                    <Icon size={16} className="text-[var(--gold)]" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  <a href={WHATSAPP} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm text-[var(--gold)] hover:gap-2 transition-all">
                    Reservar <ArrowRight size={14} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const [cat, setCat] = useState<(typeof galleryCats)[number]>("Todos");
  const [lb, setLb] = useState<string | null>(null);
  const items = cat === "Todos" ? gallery : gallery.filter((g) => g.cat === cat);
  return (
    <section id="resultados" className="py-28">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="eyebrow">Galería</span>
          <h2 className="font-display text-4xl md:text-5xl mt-4">Transformaciones</h2>
          <p className="mt-4 text-muted-foreground">Resultados reales de nuestras clientas.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {galleryCats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={[
                "px-5 py-2 rounded-full text-sm transition-all",
                cat === c
                  ? "bg-[var(--gold)] text-white shadow-[var(--shadow-soft)]"
                  : "bg-[var(--beige)] text-foreground/70 hover:bg-[var(--nude)]/60",
              ].join(" ")}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
          {items.map((g, i) => (
            <button
              key={i}
              onClick={() => setLb(g.src)}
              className="mb-4 block w-full overflow-hidden rounded-xl group relative break-inside-avoid"
            >
              <img
                src={g.src}
                alt={`Resultado ${g.cat}`}
                loading="lazy"
                className={[
                  "w-full object-cover transition-transform duration-700 group-hover:scale-105",
                  g.h === "tall" ? "aspect-[3/4]" : "aspect-square",
                ].join(" ")}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="absolute bottom-3 left-3 text-white text-xs tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                {g.cat}
              </span>
            </button>
          ))}
        </div>
      </div>
      {lb && (
        <div
          onClick={() => setLb(null)}
          className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in"
        >
          <button className="absolute top-6 right-6 text-white/90 hover:text-white" onClick={() => setLb(null)} aria-label="Cerrar">
            <X size={28} />
          </button>
          <img src={lb} alt="Resultado ampliado" className="max-h-[88vh] max-w-[92vw] rounded-xl shadow-2xl" />
        </div>
      )}
    </section>
  );
}

function Differentiators() {
  const items = [
    { icon: Sparkles, title: "Personalización total", text: "Cada tratamiento se adapta al rostro y necesidades de la clienta." },
    { icon: Award, title: "Precisión extrema", text: "Trabajo minucioso y detallista en cada sesión." },
    { icon: Heart, title: "Resultados naturales", text: "Realzamos la belleza sin artificios ni excesos." },
    { icon: MessageCircle, title: "Atención cercana", text: "Te acompañamos durante todo el proceso." },
  ];
  return (
    <section className="py-24 bg-[var(--beige)]">
      <div className="container-x">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="eyebrow">Por qué elegirnos</span>
          <h2 className="font-display text-4xl md:text-5xl mt-4">La diferencia DM Art Beauty</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((i) => {
            const Icon = i.icon;
            return (
              <div key={i.title} className="bg-white rounded-2xl p-8 text-center hover-lift">
                <div className="w-14 h-14 rounded-full mx-auto flex items-center justify-center" style={{ background: "var(--gradient-gold)" }}>
                  <Icon className="text-white" size={22} />
                </div>
                <h3 className="font-display text-xl mt-5">{i.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{i.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % testimonials.length), 5500);
    return () => clearInterval(t);
  }, []);
  return (
    <section id="opiniones" className="py-28">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="eyebrow">Testimonios</span>
          <h2 className="font-display text-4xl md:text-5xl mt-4">Lo que dicen nuestras clientas</h2>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm">
            <span className="flex">
              {[...Array(5)].map((_, k) => (
                <Star key={k} size={16} className="fill-[var(--gold)] text-[var(--gold)]" />
              ))}
            </span>
            <span className="text-muted-foreground">4.8/5 basado en más de 100 opiniones</span>
          </div>
        </div>
        <div className="max-w-3xl mx-auto relative">
          <div className="bg-white border border-border rounded-2xl p-10 md:p-14 text-center shadow-[var(--shadow-soft)]">
            <p key={i} className="font-display text-2xl md:text-3xl leading-snug text-foreground/90 animate-fade-up">
              “{testimonials[i].text}”
            </p>
            <p className="mt-6 text-sm tracking-wider uppercase text-[var(--gold)]">
              — {testimonials[i].name}
            </p>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                aria-label={`Testimonio ${k + 1}`}
                className={["h-1.5 rounded-full transition-all", k === i ? "w-8 bg-[var(--gold)]" : "w-2 bg-[var(--nude)]"].join(" ")}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaCentral() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "var(--gradient-nude)" }} />
      <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(60% 60% at 50% 50%, var(--nude), transparent)" }} />
      <div className="container-x relative">
        <div className="glass rounded-3xl p-10 md:p-16 text-center max-w-3xl mx-auto shadow-[var(--shadow-elegant)]">
          <span className="eyebrow">Reserva tu cita</span>
          <h2 className="font-display text-4xl md:text-5xl mt-4">¿Lista para verte mejor que nunca?</h2>
          <p className="mt-4 text-muted-foreground">
            Solicita tu valoración personalizada y descubre qué tratamiento es ideal para ti.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-gold btn-gold-hover">
              <MessageCircle size={18} /> Reservar por WhatsApp
            </a>
            <a href={PHONE} className="btn-outline-gold">
              <Phone size={16} /> Llamar ahora
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-28 bg-[var(--beige)]">
      <div className="container-x max-w-3xl">
        <div className="text-center mb-14">
          <span className="eyebrow">Preguntas frecuentes</span>
          <h2 className="font-display text-4xl md:text-5xl mt-4">Todo lo que necesitas saber</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="bg-white rounded-xl border border-border overflow-hidden">
                <button
                  className="w-full flex items-center justify-between text-left px-6 py-5"
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="font-medium text-foreground">{f.q}</span>
                  <ChevronDown
                    size={18}
                    className={["text-[var(--gold)] transition-transform duration-300", isOpen ? "rotate-180" : ""].join(" ")}
                  />
                </button>
                <div
                  className="grid transition-all duration-500 ease-out px-6"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 text-muted-foreground leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contacto" className="py-28">
      <div className="container-x grid lg:grid-cols-2 gap-12">
        <div>
          <span className="eyebrow">Contacto</span>
          <h2 className="font-display text-4xl md:text-5xl mt-4">Estamos en el corazón de Barcelona</h2>
          <p className="mt-4 text-muted-foreground">
            Pide tu cita o resuelve cualquier duda. Te atenderemos con la atención personalizada que mereces.
          </p>
          <ul className="mt-8 space-y-5 text-sm">
            <li className="flex items-start gap-4">
              <MapPin className="text-[var(--gold)] mt-0.5" size={20} />
              <div>
                <div className="font-medium">DM Art Beauty</div>
                <div className="text-muted-foreground">Carrer del Moianès, 4 — 08014 Barcelona</div>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Phone className="text-[var(--gold)] mt-0.5" size={20} />
              <a href={PHONE} className="hover:text-[var(--gold)] transition-colors">+34 665 19 31 61</a>
            </li>
            <li className="flex items-start gap-4">
              <Clock className="text-[var(--gold)] mt-0.5" size={20} />
              <div>
                <div>Martes a Viernes — 10:00 a 20:00</div>
                <div>Sábado — 10:00 a 14:00</div>
                <div className="text-muted-foreground">Lunes y Domingo cerrado</div>
              </div>
            </li>
          </ul>
          <div className="mt-8 rounded-2xl overflow-hidden border border-border h-64">
            <iframe
              title="Mapa DM Art Beauty"
              src="https://www.google.com/maps?q=Carrer+del+Moian%C3%A9s+4,+08014+Barcelona&output=embed"
              className="w-full h-full"
              loading="lazy"
            />
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const msg = `Hola, soy ${fd.get("name")}. Tel: ${fd.get("phone")}. Servicio: ${fd.get("service")}. ${fd.get("message")}`;
            window.open(`https://wa.me/34665193161?text=${encodeURIComponent(msg)}`, "_blank");
          }}
          className="bg-[var(--beige)] rounded-3xl p-8 md:p-10 space-y-5"
        >
          <h3 className="font-display text-2xl">Reserva tu cita</h3>
          <div className="grid gap-4">
            <input required name="name" placeholder="Nombre" className="bg-white rounded-xl px-5 py-3.5 text-sm border border-transparent focus:border-[var(--gold)] focus:outline-none transition-colors" />
            <input required name="phone" placeholder="Teléfono" className="bg-white rounded-xl px-5 py-3.5 text-sm border border-transparent focus:border-[var(--gold)] focus:outline-none transition-colors" />
            <select required name="service" defaultValue="" className="bg-white rounded-xl px-5 py-3.5 text-sm border border-transparent focus:border-[var(--gold)] focus:outline-none transition-colors">
              <option value="" disabled>Selecciona un servicio</option>
              {services.map((s) => (
                <option key={s.title}>{s.title}</option>
              ))}
            </select>
            <textarea name="message" rows={4} placeholder="Cuéntanos qué te gustaría..." className="bg-white rounded-xl px-5 py-3.5 text-sm border border-transparent focus:border-[var(--gold)] focus:outline-none transition-colors resize-none" />
          </div>
          <button type="submit" className="btn-gold btn-gold-hover w-full">
            <MessageCircle size={18} /> Enviar por WhatsApp
          </button>
          <p className="text-xs text-muted-foreground text-center">Respondemos en menos de 1h en horario laboral.</p>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground text-white/85">
      <div className="container-x py-16 grid md:grid-cols-4 gap-10">
        <div>
          <div className="font-display text-2xl text-white">
            DM <span className="text-[var(--gold)]">Art</span> Beauty
          </div>
          <p className="mt-4 text-sm text-white/65 leading-relaxed">
            Belleza especializada en micropigmentación, microblading y tratamientos estéticos en Barcelona.
          </p>
        </div>
        <div>
          <h4 className="font-display text-lg text-white mb-4">Empresa</h4>
          <ul className="space-y-2 text-sm text-white/65">
            <li><a href="#sobre" className="hover:text-[var(--gold)]">Sobre Diana</a></li>
            <li><a href="#resultados" className="hover:text-[var(--gold)]">Resultados</a></li>
            <li><a href="#opiniones" className="hover:text-[var(--gold)]">Opiniones</a></li>
            <li><a href="#faq" className="hover:text-[var(--gold)]">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg text-white mb-4">Servicios</h4>
          <ul className="space-y-2 text-sm text-white/65">
            <li><a href="#servicios" className="hover:text-[var(--gold)]">Micropigmentación</a></li>
            <li><a href="#servicios" className="hover:text-[var(--gold)]">Microblading</a></li>
            <li><a href="#servicios" className="hover:text-[var(--gold)]">Manicura y Pedicura</a></li>
            <li><a href="#servicios" className="hover:text-[var(--gold)]">Tratamientos faciales</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg text-white mb-4">Contacto</h4>
          <ul className="space-y-2 text-sm text-white/65">
            <li>Carrer del Moianès, 4</li>
            <li>08014 Barcelona</li>
            <li><a href={PHONE} className="hover:text-[var(--gold)]">+34 665 19 31 61</a></li>
            <li><a href={WHATSAPP} target="_blank" rel="noreferrer" className="hover:text-[var(--gold)]">WhatsApp</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-6 text-xs text-white/50 flex flex-col md:flex-row gap-2 justify-between">
          <span>DM Art Beauty © 2026 — Todos los derechos reservados.</span>
          <span>Micropigmentación · Microblading · Estética · Barcelona</span>
        </div>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <>
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-[var(--shadow-elegant)] transition-transform hover:scale-110"
        style={{ background: "var(--gradient-gold)" }}
      >
        <MessageCircle size={24} />
      </a>
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 glass border-t border-border p-3 flex gap-2">
        <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-gold btn-gold-hover flex-1 !py-3">
          <MessageCircle size={16} /> WhatsApp
        </a>
        <a href={PHONE} className="btn-outline-gold flex-1 !py-3">
          <Phone size={14} /> Llamar
        </a>
      </div>
    </>
  );
}

function Index() {
  return (
    <main className="min-h-screen bg-background pb-20 lg:pb-0">
      <Header />
      <Hero />
      <TrustStats />
      <About />
      <Services />
      <Gallery />
      <Differentiators />
      <Testimonials />
      <CtaCentral />
      <Faq />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
