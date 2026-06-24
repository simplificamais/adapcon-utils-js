export const formatCnpj = (cnpj: string): string => {
  if (typeof cnpj !== 'string' || cnpj.length !== 14) return ''
  if (!/^[0-9A-Z]{14}$/.test(cnpj)) return ''
  return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8, 12)}-${cnpj.slice(12, 14)}`
}

export const formatCpf = (cpf: string): string => {
  if (typeof cpf !== 'string' || cpf.length !== 11) return ''

  cpf = cpf.replace(/\D/g, '')
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2')
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2')
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  return cpf
}
