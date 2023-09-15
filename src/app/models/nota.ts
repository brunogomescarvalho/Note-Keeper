import { Categoria } from "./categoria"

export class Nota {
    id?: number
    tema?: Tema
    titulo?: string
    conteudo?: string
    arquivado?: boolean
    categoriaId?: number


    constructor() {
        this.arquivado = false;
    }

}

export type Tema = "primary" | "danger" | "warning" 