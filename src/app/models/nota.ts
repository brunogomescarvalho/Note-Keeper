
export class Nota {
    id?: number
    tema?: Tema
    titulo?: string
    conteudo?: string
    arquivado?: boolean
    categoriaId?: number
  
}

export type Tema = "primary" | "danger" | "warning" | "secondary" | "success"