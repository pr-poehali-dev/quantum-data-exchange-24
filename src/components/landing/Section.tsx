import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { SectionProps } from "@/types"
import ConstitutionModal from "./ConstitutionModal"

const FLAG_URL = "https://cdn.poehali.dev/projects/2bd2ccfc-cbb7-444b-87bb-b257151af53d/files/7d867abf-aa57-4403-9eff-4568d0cc4acb.jpg"

function CitizenshipForm({ isActive }: { isActive: boolean }) {
  const [name, setName] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [citizenName, setCitizenName] = useState("")

  const handleSubmit = () => {
    if (name.trim()) {
      setCitizenName(name.trim())
      setSubmitted(true)
    }
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

export default function Section({ id, title, subtitle, content, isActive, showButton, buttonText, showFlag, showCitizenship, showConstitution }: SectionProps) {
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
            <motion.p
              className="text-lg md:text-xl lg:text-2xl max-w-2xl mt-6 text-neutral-400"
              initial={{ opacity: 0, y: 50 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {content}
            </motion.p>
          )}

          {showCitizenship && <CitizenshipForm isActive={isActive} />}

          {showConstitution && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <ConstitutionModal />
            </motion.div>
          )}

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