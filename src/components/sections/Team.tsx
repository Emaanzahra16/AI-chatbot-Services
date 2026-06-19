"use client";

import { motion } from "framer-motion";
import { Linkedin, Mail, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const teamMembers = [
  {
    name: "Syed Ali Imran",
    role: "CEO & Co-fundador",
    bio: "Ingeniero mecatrónico con más de 5 años de experiencia en las divisiones de automatización industrial y robótica de HP. Lideró equipos multifuncionales desplegando sistemas de control de calidad basados en IA en 12 plantas de fabricación. Apasionado por tender puentes entre la inteligencia del hardware y la autonomía del software.",
    image: "/images/team/ceo.jpeg",
    linkedin: "https://www.linkedin.com/in/syed-ali-imran-3b633189/",
    email: "aliimran1231@gmail.com",
  },
];

export function Team() {
  return (
    <section className="py-20 md:py-28 bg-ink-900/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-sm text-violet-400 font-medium tracking-wider uppercase"
          >
            El equipo
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mt-2"
          >
            Expertos en IA que implementan lo que venden
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-ink-300"
          >
            No subcontratamos. El equipo que diseña y construye tu agente es el 
            mismo que te asesora desde el primer día.
          </motion.p>
        </div>

        {/* Single column - center aligned */}
        <div className="max-w-2xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="bg-ink-800/40 rounded-2xl p-6 border border-ink-700 hover:border-violet-500/30 transition-all text-center"
            >
              {/* Profile Image - Centered */}
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {member.name}
                </h3>
                <p className="text-sm text-violet-400">{member.role}</p>
                <p className="text-sm text-ink-300 mt-3 leading-relaxed max-w-lg mx-auto">
                  {member.bio}
                </p>
                <div className="flex justify-center gap-3 mt-4">
                  <Link
                    href={member.linkedin}
                    className="text-ink-400 hover:text-white transition"
                    target="_blank"
                  >
                    <Linkedin className="w-5 h-5" />
                  </Link>
                  <Link
                    href={`mailto:${member.email}`}
                    className="text-ink-400 hover:text-white transition"
                  >
                    <Mail className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-ink-400">
            📍 Barcelona · Remoto con la misma efectividad que en oficina
          </p>
        </motion.div>
      </div>
    </section>
  );
}