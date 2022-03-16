import { eq } from '@sarasvati-platform/abstract-query'


export const named = (name: string) => eq('name', name)