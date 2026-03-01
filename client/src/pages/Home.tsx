import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Cpu, Code2, ShieldAlert, Zap, Award, BookOpen, GraduationCap, ChevronRight, User, Instagram, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

import { api } from "@shared/routes";
import { useCreateMessage } from "@/hooks/use-messages";
import { BottomNav } from "@/components/BottomNav";
import { CyberCard } from "@/components/CyberCard";
import { CyberButton } from "@/components/CyberButton";
import { CyberInput } from "@/components/CyberInput";
import { SectionHeading } from "@/components/SectionHeading";

// Validasi Form menggunakan skema dari shared
const contactSchema = api.messages.create.input;
type ContactFormValues = z.infer<typeof contactSchema>;

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const { mutate: sendMessage, isPending } = useCreateMessage();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormValues) => {
    sendMessage(data, {
      onSuccess: () => reset()
    });
  };

  return (
    <div ref={containerRef} className="relative min-h-screen pb-32">
      {/* Persistent Background */}
      <div className="fixed inset-0 z-[-1] bg-background">
        <motion.div 
          style={{ y: yBg }} 
          className="absolute inset-0 bg-cyber-grid opacity-20"
        />
        {/* Glow orb top left */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
        {/* Glow orb bottom right */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-[120px]" />
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-32 pt-24">
        
        {/* HERO SECTION */}
        <section id="home" className="min-h-[80vh] flex flex-col justify-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-primary/50 bg-primary/10 text-primary font-display text-sm cyber-clip-path">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              SISTEM_ONLINE // V.1.0
            </div>
            
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-display font-black leading-none tracking-tighter">
              <span className="block text-foreground">REYGA WAHYU</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-secondary animate-glitch text-glow-cyan">
                NUR HIDAYAT
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-muted-foreground font-sans max-w-2xl border-l-4 border-primary pl-4">
              Netrunner pelajar berusia 17 Tahun dari SMK Bina Teknika Cileungsi. Meretas batasan realitas melalui kode.
            </p>

            <div className="pt-8 flex flex-wrap gap-4">
              <CyberButton onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                INITIATE_CONTACT
              </CyberButton>
              <CyberButton variant="outline" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
                VIEW_DATA <ChevronRight className="w-4 h-4 inline ml-2" />
              </CyberButton>
            </div>
          </motion.div>
        </section>

        {/* ABOUT & HISTORY SECTION */}
        <section id="about" className="pt-16">
          <SectionHeading title="System.Profile" subtitle="Identitas Subjek & Log Sejarah" />
          
          <div className="grid md:grid-cols-2 gap-8">
            <CyberCard delay={0.1} className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-primary mb-2">
                <User className="w-6 h-6" />
                <h3 className="text-xl font-display font-bold uppercase">Tentang Entitas</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Halo, sistem mendeteksi nama saya sebagai <span className="text-foreground font-bold text-glow-cyan">Reyga Wahyu Nur HIDAYAT</span>. 
                Saat ini entitas biologi saya berusia 17 tahun. Saya adalah seorang siswa aktif di 
                <span className="text-primary font-semibold mx-1">SMK BINA TEKNIKA CILEUNGSI</span>.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Saya memiliki ketertarikan yang sangat mendalam pada arsitektur dunia digital, pengembangan perangkat lunak, dan bagaimana menjaga keamanan di dunia maya (Cybersecurity).
              </p>
            </CyberCard>

            <CyberCard delay={0.2} variant="pink" className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-secondary mb-2">
                <BookOpen className="w-6 h-6" />
                <h3 className="text-xl font-display font-bold uppercase">Sejarah Singkat</h3>
              </div>
              <div className="space-y-4 border-l-2 border-secondary/30 pl-4 ml-2">
                <div className="relative">
                  <div className="absolute -left-[23px] top-1 w-3 h-3 bg-secondary rounded-full box-glow-pink" />
                  <h4 className="text-foreground font-bold">Fase Inisialisasi</h4>
                  <p className="text-sm text-muted-foreground mt-1">Berawal dari rasa penasaran yang tak terbendung terhadap struktur program komputer dan bagaimana internet menghubungkan dunia, saya mulai belajar coding secara otodidak di ruang gelap kamar saya.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[23px] top-1 w-3 h-3 bg-secondary/50 rounded-full" />
                  <h4 className="text-foreground font-bold">Fase Pengembangan</h4>
                  <p className="text-sm text-muted-foreground mt-1">Kini, saya terus menginstal protokol pengetahuan baru dan mengasah kemampuan teknis saya di bangku kejuruan untuk bersiap menjadi spesialis IT di masa depan.</p>
                </div>
              </div>
            </CyberCard>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="pt-16">
          <SectionHeading title="Combat.Specs" subtitle="Arsitektur Kemampuan Teknis" align="right" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Frontend Dev", level: 85, icon: Code2, desc: "HTML, CSS, JS, React", color: "cyan" },
              { name: "Robotika Arduino", level: 80, icon: Cpu, desc: "Microcontroller, Sensors, C++", color: "pink" },
              { name: "Cyber Security", level: 60, icon: ShieldAlert, desc: "Network Basics, Pen-test intro", color: "cyan" },
              { name: "Hardware Specs", level: 90, icon: Cpu, desc: "PC Building, Troubleshooting", color: "pink" }
            ].map((skill, index) => (
              <CyberCard key={skill.name} delay={index * 0.1} variant={skill.color as "cyan" | "pink"} className="group">
                <div className="flex justify-between items-start mb-4">
                  <skill.icon className={cn("w-8 h-8", skill.color === "cyan" ? "text-primary" : "text-secondary")} />
                  <span className="font-display font-bold text-2xl text-muted-foreground group-hover:text-foreground transition-colors">
                    {skill.level}%
                  </span>
                </div>
                <h4 className="font-display text-lg font-bold text-foreground mb-1 uppercase tracking-wider">{skill.name}</h4>
                <p className="text-sm text-muted-foreground mb-4">{skill.desc}</p>
                
                {/* Progress bar */}
                <div className="h-1 w-full bg-background relative overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={cn("absolute top-0 left-0 h-full", skill.color === "cyan" ? "bg-primary box-glow-cyan" : "bg-secondary box-glow-pink")}
                  />
                </div>
              </CyberCard>
            ))}
          </div>
        </section>

        {/* ACHIEVEMENTS SECTION */}
        <section id="achievements" className="pt-16">
          <SectionHeading title="Hall_of_Fame" subtitle="Log Prestasi Tercatat" />
          
          <div className="space-y-4">
            {[
              { title: "Booth Student Camp PT. Solusi Intek Indonesia", org: "Mikrokontroler", year: "2024" },
              { title: "Booth Student Camp PT. Solusi Intek Indonesia", org: "Programmer", year: "2025" },
              { title: "Booth Student Camp PT. Solusi Intek Indonesia", org: "Mikrokontroler", year: "2025" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group relative flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 bg-card/40 border border-primary/20 hover:border-primary/80 transition-all hover:bg-primary/5 cyber-clip-path"
              >
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 group-hover:box-glow-cyan transition-all">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg text-foreground">{item.title}</h4>
                    <p className="text-sm text-primary/80">{item.org}</p>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 font-display text-muted-foreground group-hover:text-primary transition-colors tracking-widest">
                  [{item.year}]
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="pt-16 pb-16">
          <SectionHeading title="Comm.Link" subtitle="Buka Saluran Komunikasi" align="center" />
          
          <div className="max-w-2xl mx-auto">
            <CyberCard delay={0.2} className="relative z-10">
              <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none" />
              
              <div className="grid sm:grid-cols-2 gap-4 mb-8 relative z-20">
                <a 
                  href="https://instagram.com/rudymayer.fr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/20 hover:border-primary/50 transition-all group cyber-clip-path"
                >
                  <Instagram className="w-5 h-5 text-primary group-hover:box-glow-cyan" />
                  <span className="text-sm font-display text-muted-foreground group-hover:text-foreground">@rudymayer.fr</span>
                </a>
                <a 
                  href="https://wa.me/6288994380674" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-secondary/5 border border-secondary/20 hover:border-secondary/50 transition-all group cyber-clip-path"
                >
                  <Phone className="w-5 h-5 text-secondary group-hover:box-glow-pink" />
                  <span className="text-sm font-display text-muted-foreground group-hover:text-foreground">+62 889-9438-0674</span>
                </a>
              </div>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-20">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <CyberInput 
                      label="NAMA ENTITAS" 
                      placeholder="Masukkan nama..." 
                      {...register("name")}
                    />
                    {errors.name && <span className="text-xs text-destructive mt-1 block font-display">{errors.name.message}</span>}
                  </div>
                  <div>
                    <CyberInput 
                      label="ALAMAT PROTOKOL (EMAIL)" 
                      type="email"
                      placeholder="user@network.com" 
                      {...register("email")}
                    />
                    {errors.email && <span className="text-xs text-destructive mt-1 block font-display">{errors.email.message}</span>}
                  </div>
                </div>
                
                <div>
                  <CyberInput 
                    label="DATA TRANSMISI (PESAN)" 
                    placeholder="Ketikkan pesan anda di sini..." 
                    multiline
                    {...register("message")}
                  />
                  {errors.message && <span className="text-xs text-destructive mt-1 block font-display">{errors.message.message}</span>}
                </div>

                <CyberButton 
                  type="submit" 
                  className="w-full" 
                  isLoading={isPending}
                >
                  TRANSMIT_DATA
                </CyberButton>
              </form>
            </CyberCard>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
