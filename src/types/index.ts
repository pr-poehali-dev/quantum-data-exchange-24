import type { ReactNode } from "react"

export interface Section {
  id: string
  title: string
  subtitle?: ReactNode
  content?: string
  showButton?: boolean
  buttonText?: string
  showFlag?: boolean
  showCitizenship?: boolean
  showConstitution?: boolean
  showHymn?: boolean
  showMap?: boolean
  showCitizensList?: boolean
}

export interface SectionProps extends Section {
  isActive: boolean
}