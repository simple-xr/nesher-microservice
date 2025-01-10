import { Type } from "class-transformer"
import { Collection } from "src/modules/collections/entities/collection.entity"

export class Furniture {
    id: string 
    nome: string
    local: string
    colocarCima: boolean
    colocarDireita: boolean
    colocarEsquerda: boolean
    tipo: string
    tamanhox: number
    tamanhoy: number
    cor: string[]
    botao: boolean
    canto: boolean
    category: "BALCAO" | "ARMARIO" | "PANELEIRO" | "ACESSORIO"
    nomeMovel: string
    img: string
    collection_id: string
    @Type(()=>Collection)
    collection?: Collection
    order: number
}
