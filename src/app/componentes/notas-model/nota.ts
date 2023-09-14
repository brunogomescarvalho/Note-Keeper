export class Nota {
    id?: number
    tema?: Tema
    titulo?: string
    conteudo?: string
    arquivado?: boolean

    constructor() {
        this.arquivado = false;
    }

}

export type Tema = "primary" | "danger" | "warning" 