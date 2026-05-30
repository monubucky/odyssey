const validTransitions: Record<string, string[]> = {
  pending: ['accepted', 'cancelled'],
  accepted: ['preparing'],
  preparing: ['ready'],
  ready: ['completed'],
}

export function canTransition(current: string, next: string) {
  return validTransitions[current]?.includes(next)
}