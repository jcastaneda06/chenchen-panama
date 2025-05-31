export const formatSalary = (salary: number, multiplier?: 'd' | 'm' | 'y') => {
  if (multiplier)
    switch (multiplier) {
      case 'd':
        salary = salary / 30
        break
      case 'y':
        salary = salary * 12
        break
      default:
        salary
        break
    }

  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(salary)

  return formatted
}
