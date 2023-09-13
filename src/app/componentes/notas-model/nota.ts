export class Nota {
    id?: number;
    titulo?: string;
    conteudo?: string
    tema?: Tema

}

export type Tema = "primary" | "danger" | "warning" 