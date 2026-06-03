import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { SectionProps } from "@/types"
import ConstitutionSection from "./ConstitutionSection"

const CITIZENS_URL = "https://functions.poehali.dev/7335c1d2-721f-438b-86b4-2f9d774ead55"

function CitizensCounter({ isActive }: { isActive: boolean }) {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    fetch(CITIZENS_URL)
      .then(r => r.json())
      .then(d => setCount(d.count))
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isActive ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="mt-6 flex items-center gap-3"
    >
      <span className="text-neutral-400 text-sm uppercase tracking-widest">Граждан</span>
      <span className="text-white text-2xl font-bold">
        {count === null ? "..." : count}
      </span>
    </motion.div>
  )
}

const FLAG_URL = "https://cdn.poehali.dev/projects/2bd2ccfc-cbb7-444b-87bb-b257151af53d/files/7d867abf-aa57-4403-9eff-4568d0cc4acb.jpg"
const FLAG_NEW_URL = "https://cdn.poehali.dev/projects/2bd2ccfc-cbb7-444b-87bb-b257151af53d/files/df11c6bb-8f81-4521-860b-64a14648300e.jpg"

function CitizenshipForm({ isActive }: { isActive: boolean }) {
  const [name, setName] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [citizenName, setCitizenName] = useState("")

  const handleSubmit = () => {
    const trimmed = name.trim()
    if (!trimmed) return
    setCitizenName(trimmed)
    setSubmitted(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isActive ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mt-10 max-w-md"
    >
      {!submitted ? (
        <div className="flex gap-3">
          <Input
            placeholder="Введите ваше имя..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-white"
          />
          <Button
            onClick={handleSubmit}
            className="bg-purple-600 hover:bg-purple-500 text-white border-0 whitespace-nowrap"
          >
            Вступить
          </Button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="p-6 border border-purple-400/50 rounded-xl bg-purple-900/30 text-white"
        >
          <p className="text-2xl font-bold mb-2">🎉 Добро пожаловать!</p>
          <p className="text-neutral-300">
            Гражданин <span className="text-white font-semibold">{citizenName}</span> — вы теперь полноправный гражданин Квартирной Российской Республики!
          </p>
          
          <button
            className="mt-4 text-sm text-purple-400 underline hover:text-purple-300"
            onClick={() => { setSubmitted(false); setName("") }}
          >
            Зарегистрировать другого гражданина
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}

const HYMN_LINES = [
  "Славься, Славься Квартирная Российская Республика,",
  "ты наша, великая страна.",
  "И сияет солнце над тобой,",
  "и судьба твоя светла.",
  "",
  "Над старинным Сальниковградским подоконником",
  "вьётся знамя с жёлтым солнцем.",
  "И звучат священные слова —",
  "Славься, Квартирная Российская Республика!",
]

function HymnText({ isActive }: { isActive: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isActive ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-8 max-w-2xl"
    >
      <div className="border border-purple-500/30 rounded-xl bg-purple-900/20 p-6 md:p-8">
        {HYMN_LINES.map((line, i) =>
          line === "" ? (
            <div key={i} className="h-4" />
          ) : (
            <motion.p
              key={i}
              className="text-lg md:text-xl text-neutral-200 leading-relaxed italic"
              initial={{ opacity: 0, x: -20 }}
              animate={isActive ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
            >
              {line}
            </motion.p>
          )
        )}
      </div>
    </motion.div>
  )
}

const MAP_URL = "https://cdn.poehali.dev/projects/2bd2ccfc-cbb7-444b-87bb-b257151af53d/bucket/83da35ee-08e7-4225-9657-a52528dc814d.jpg"
const CITIZENS_API = "https://functions.poehali.dev/7335c1d2-721f-438b-86b4-2f9d774ead55"

function CitizensList({ isActive }: { isActive: boolean }) {
  const [citizens, setCitizens] = useState<{ id: number; name: string; registered_at: string | null }[]>([])

  useEffect(() => {
    if (isActive) {
      fetch(CITIZENS_API)
        .then(r => r.json())
        .then(d => setCitizens(d.citizens || []))
    }
  }, [isActive])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isActive ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-8 max-w-lg w-full"
    >
      {citizens.length === 0 ? (
        <p className="text-neutral-400">Пока нет граждан.</p>
      ) : (
        <ul className="space-y-3">
          {citizens.map((c, i) => (
            <motion.li
              key={c.id}
              initial={{ opacity: 0, x: -20 }}
              animate={isActive ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
              className="flex items-center gap-4 border border-white/10 rounded-xl px-5 py-3 bg-white/5"
            >
              <span className="text-purple-400 font-bold text-sm w-6 text-right">#{i + 1}</span>
              <span className="text-white text-lg">{c.name}</span>
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  )
}

export default function Section({ id, title, subtitle, content, isActive, showButton, buttonText, showFlag, showCitizenship, showConstitution, showHymn, showMap, showCitizensList }: SectionProps) {
  return (
    <section id={id} className="relative h-screen w-full snap-start flex flex-col justify-center p-8 md:p-16 lg:p-24">
      {subtitle && (
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {subtitle}
        </motion.div>
      )}

      <div className={`flex items-center gap-12 ${showFlag ? 'flex-row' : ''}`}>
        <div>
          <motion.h2
            className="text-4xl md:text-6xl lg:text-[5rem] xl:text-[6rem] font-bold leading-[1.1] tracking-tight max-w-4xl text-white whitespace-pre-line"
            initial={{ opacity: 0, y: 50 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h2>

          {content && (
            <motion.div
              className="text-lg md:text-xl lg:text-2xl max-w-2xl mt-6 text-neutral-400 space-y-4"
              initial={{ opacity: 0, y: 50 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {content.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </motion.div>
          )}

          {showFlag && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-8"
            >
              <img
                src={FLAG_NEW_URL}
                alt="Флаг Квартирной Российской Республики"
                className="w-48 h-32 md:w-64 md:h-44 object-cover rounded-lg shadow-2xl border border-white/20"
              />
              <CitizensCounter isActive={isActive} />
            </motion.div>
          )}

          {showMap && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8"
            >
              <img
                src={MAP_URL}
                alt="Карта Квартирной Российской Республики"
                className="max-w-xs md:max-w-sm lg:max-w-md rounded-xl shadow-2xl border border-white/10"
              />
            </motion.div>
          )}

          {showCitizensList && <CitizensList isActive={isActive} />}

          {showHymn && <HymnText isActive={isActive} />}

          {showCitizenship && <CitizenshipForm isActive={isActive} />}

          {showConstitution && <ConstitutionSection isActive={isActive} />}

          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 md:mt-16"
            >
              <Button
                variant="outline"
                size="lg"
                className="text-purple-400 bg-transparent border-purple-400 hover:bg-purple-400 hover:text-white transition-colors"
              >
                {buttonText}
              </Button>
            </motion.div>
          )}
        </div>

        {showFlag && (
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isActive ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden md:block flex-shrink-0"
          >
            <img
              src={FLAG_URL}
              alt="Флаг Квартирной Российской Республики"
              className="w-64 h-44 lg:w-80 lg:h-56 object-cover rounded-lg shadow-2xl border border-white/20"
            />
          </motion.div>
        )}
      </div>
    </section>
  )
}