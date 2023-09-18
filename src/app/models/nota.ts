import { Categoria } from "./categoria"

export class Nota {
    id?: number
    tema?: Tema
    titulo?: string
    conteudo?: string
    arquivado?: boolean
    categoriaId?: number
    categoria?: Categoria

    constructor() {
        this.id = undefined,
            this.tema = "dark",
            this.titulo = '',
            this.conteudo = '',
            this.arquivado = false,
            this.categoriaId = undefined,
            this.categoria = undefined
    }

}

export type Tema = "primary" | "danger" | "warning" | "secondary" | "success" | 'dark'