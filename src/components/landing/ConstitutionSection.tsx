import { motion } from "framer-motion"

const CONSTITUTION = {
  preamble: "Мы, граждане Квартирной Российской Республики, объединённые общими ценностями свободы, справедливости и уважения друг к другу, принимаем настоящую Конституцию как основной закон нашего государства.",
  chapters: [
    {
      title: "Глава I. Основы государства",
      articles: [
        { num: 1, text: "Квартирная Российская Республика — суверенное виртуальное государство, основанное на принципах демократии и равенства всех граждан." },
        { num: 2, text: "Государство основано Матвеем 5 октября 2025 года. Дата основания является национальным праздником — Днём Республики." },
        { num: 3, text: "Символами государства являются: Флаг (фиолетовое полотно с девятью зелёными трубами и солнцем), гимн и настоящая Конституция." },
        { num: 4, text: "Официальный язык КРР — русский. Все официальные документы составляются на русском языке." },
      ]
    },
    {
      title: "Глава II. Права и свободы граждан",
      articles: [
        { num: 5, text: "Каждый гражданин имеет право на уважение, достоинство и свободу слова. Никто не может быть унижен или оскорблён." },
        { num: 6, text: "Все граждане равны перед законом вне зависимости от возраста, пола, убеждений или места проживания." },
        { num: 7, text: "Гражданин имеет право свободно выражать своё мнение, если оно не нарушает права других граждан." },
        { num: 8, text: "Каждый гражданин вправе предлагать новые законы и поправки к Конституции через обращение к Основателю." },
        { num: 9, text: "Гражданин имеет право на защиту от несправедливого обвинения. Вина должна быть доказана." },
      ]
    },
    {
      title: "Глава III. Законы республики",
      articles: [
        { num: 10, text: "Запрещается причинять вред другим гражданам: физически, морально или иным образом." },
        { num: 11, text: "Запрещается распространять ложную информацию от имени государства или его должностных лиц." },
        { num: 12, text: "Каждый гражданин обязан уважать символы государства: флаг, гимн и Конституцию." },
        { num: 13, text: "Новые граждане принимаются путём добровольного вступления. Принудительное гражданство запрещено." },
        { num: 14, text: "Основатель республики обладает высшим авторитетом и несёт ответственность за благополучие всех граждан." },
      ]
    },
    {
      title: "Глава IV. Гражданство",
      articles: [
        { num: 15, text: "Гражданином КРР может стать любой желающий, разделяющий ценности республики." },
        { num: 16, text: "Гражданство приобретается путём регистрации имени в реестре граждан на официальном сайте." },
        { num: 17, text: "Гражданин вправе добровольно отказаться от гражданства. Лишение гражданства против воли запрещено." },
      ]
    },
  ]
}

export default function ConstitutionSection({ isActive }: { isActive: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isActive ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-6 max-w-2xl w-full overflow-y-auto max-h-[60vh] pr-2 space-y-6"
    >
      <div className="bg-purple-900/30 border border-purple-500/30 rounded-xl p-5">
        <p className="text-xs uppercase tracking-widest text-purple-400 mb-3 font-semibold">Преамбула</p>
        <p className="text-neutral-300 leading-relaxed italic text-sm">{CONSTITUTION.preamble}</p>
      </div>

      {CONSTITUTION.chapters.map((chapter, i) => (
        <motion.div
          key={chapter.title}
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
        >
          <h3 className="text-purple-400 font-bold text-xs uppercase tracking-widest mb-3">
            {chapter.title}
          </h3>
          <div className="space-y-2">
            {chapter.articles.map((article) => (
              <div key={article.num} className="flex gap-4">
                <span className="text-purple-500 font-mono text-xs mt-0.5 flex-shrink-0">
                  Ст. {article.num}
                </span>
                <p className="text-neutral-300 text-sm leading-relaxed">{article.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      <div className="border-t border-purple-500/20 pt-4 text-center">
        <p className="text-neutral-500 text-xs">Принята 5 октября 2025 года · Основатель Матвей</p>
      </div>
    </motion.div>
  )
}
