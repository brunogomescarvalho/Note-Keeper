
export class Nota {
    id?: number
    tema?: Tema
    titulo?: string
    conteudo?: string
    arquivado?: boolean
    categoriaId?: number

    constructor() {
        this.tema = "dark",
            this.titulo = '',
            this.conteudo = '',
            this.arquivado = false,
            this.categoriaId = undefined
    }

}

export type Tema = "primary" | "danger" | "warning" | "secondary" | "success" | 'dark'