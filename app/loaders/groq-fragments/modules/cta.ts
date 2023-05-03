import groq from 'groq'
import type {Card} from '../objects/card'
import {card} from '../objects/card'

export type CTAModule = {
  _type: 'cta'
  _key: string
  title: string
  subtitle: string
  cards: Card[]
}

export const ctaQuery = groq`
  _type,
  _key,
  title,
  subtitle,
  cards[] {
    ${card}
  }
`
