export class Nota {
    id?: number;
    titulo?: string;
    conteudo?: string
    tema?: Tema

}

type Tema = "primary" | "danger" | "warning" 