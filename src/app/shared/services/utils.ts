import { Injectable } from '@angular/core';
import { AreasDoConhecimento, TrabalhoEmEventos } from './objTypes';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  makeTrabalhoEmEvento(data: any[]): TrabalhoEmEventos[] {
    const works: TrabalhoEmEventos[] = [];
    data.forEach((element) => {
      const autores = element['AUTORES_asArray'].map((a: any) => {
        return {
          nomeCompletoDoAutor: a['_NOME-COMPLETO-DO-AUTOR'],
          nomeParaCitacao: a['_NOME-PARA-CITACAO'],
          ordemDeAutoria: a['_ORDEM-DE-AUTORIA'],
          cpf: a['_CPF'],
          numeroIdCNPQ: a['_NUMERO-ID-CNPQ'],
        };
      });

      let areasDoConhecimento: AreasDoConhecimento = {};
      if (element['AREAS-DO-CONHECIMENTO']) {
        areasDoConhecimento = this.makeAreasDoConhecimento(
          element['AREAS-DO-CONHECIMENTO']
        );
      }

      const work: TrabalhoEmEventos = {
        sequenciaProducao: element['SEQUENCIA-PRODUCAO'],
        informacoesAdicionais: element['INFORMACOES-ADICIONAIS'],
        dadosBasicosDoTrabalho: {
          natureza: element['DADOS-BASICOS-DO-TRABALHO']['_NATUREZA'],
          tituloDoTrabalho:
            element['DADOS-BASICOS-DO-TRABALHO']['_TITULO-DO-TRABALHO'],
          anoDoTrabalho:
            element['DADOS-BASICOS-DO-TRABALHO']['_ANO-DO-TRABALHO'],
          paisDoEvento: element['DADOS-BASICOS-DO-TRABALHO']['_PAIS-DO-EVENTO'],
          idioma: element['DADOS-BASICOS-DO-TRABALHO']['_IDIOMA'],
          meioDeDivulgacao:
            element['DADOS-BASICOS-DO-TRABALHO']['_MEIO-DE-DIVULGACAO'],
          homePageDoTrabalho:
            element['DADOS-BASICOS-DO-TRABALHO']['_HOME-PAGE-DO-TRABALHO'],
          flagRelevancia:
            element['DADOS-BASICOS-DO-TRABALHO']['_FLAG-RELEVANCIA'],
          doi: element['DADOS-BASICOS-DO-TRABALHO']['_DOI'],
          tituloDoTrabalhoIngles:
            element['DADOS-BASICOS-DO-TRABALHO']['_TITULO-DO-TRABALHO-INGLES'],
          flagDivulgacaoCientifica:
            element['DADOS-BASICOS-DO-TRABALHO']['_FLAG-DIVULGACAO-CIENTIFICA'],
        },
        detalhamentoDoTrabalho: {
          classificacaoDoEvento:
            element['DETALHAMENTO-DO-TRABALHO']['_CLASSIFICACAO-DO-EVENTO'],
          nomeDoEvento: element['DETALHAMENTO-DO-TRABALHO']['_NOME-DO-EVENTO'],
          cidadeDoEvento:
            element['DETALHAMENTO-DO-TRABALHO']['_CIDADE-DO-EVENTO'],
          anoDeRealizacao:
            element['DETALHAMENTO-DO-TRABALHO']['_ANO-DE-REALIZACAO'],
          tituloDosAnaisOuProceedings:
            element['DETALHAMENTO-DO-TRABALHO'][
              '_TITULO-DOS-ANAIS-OU-PROCEEDINGS'
            ],
          volume: element['DETALHAMENTO-DO-TRABALHO']['_VOLUME'],
          fasciculo: element['DETALHAMENTO-DO-TRABALHO']['_FASCICULO'],
          serie: element['DETALHAMENTO-DO-TRABALHO']['_SERIE'],
          paginaInicial: element['DETALHAMENTO-DO-TRABALHO']['_PAGINAICIAL'],
          paginaFinal: element['DETALHAMENTO-DO-TRABALHO']['_PAGINAFINAL'],
          isbn: element['DETALHAMENTO-DO-TRABALHO']['_ISBN'],
          nomeDaEditora:
            element['DETALHAMENTO-DO-TRABALHO']['_NOME-DA-EDITORA'],
          cidadeDaEditora:
            element['DETALHAMENTO-DO-TRABALHO']['_CIDADE-DA-EDITORA'],
          nomeDoEventoIngles:
            element['DETALHAMENTO-DO-TRABALHO']['_NOME-DO-EVENTO-INGLES'],
        },
        autores,
        palavrasChave: element['PALAVRAS-CHAVE'],
        areasDoConhecimento,
        setoresDeAtividade: element['SETORES-DE-ATIVIDADE'],
      };
      works.push(work);
    });

    return works;
  }

  makeAreasDoConhecimento(data: any) {
    const areasDoConhecimento: AreasDoConhecimento = {};
    if (data['AREA-DO-CONHECIMENTO-1']) {
      areasDoConhecimento.areaDoConhecimento1 = {
        nomeGrandeAreaDoConhecimento:
          data['AREA-DO-CONHECIMENTO-1']['_NOME-GRANDE-AREA-DO-CONHECIMENTO'],
        nomeDaAreaDoConhecimento:
          data['AREA-DO-CONHECIMENTO-1']['_NOME-DA-AREA-DO-CONHECIMENTO'],
        nomeDaSubAreaDoConhecimento:
          data['AREA-DO-CONHECIMENTO-1']['_NOME-DA-SUB-AREA-DO-CONHECIMENTO'],
        nomeDaEspecialidade:
          data['AREA-DO-CONHECIMENTO-1']['_NOME-DA-ESPECIALIDADE'],
      };
    }
    if (data['AREA-DO-CONHECIMENTO-2']) {
      areasDoConhecimento.areaDoConhecimento2 = {
        nomeGrandeAreaDoConhecimento:
          data['AREA-DO-CONHECIMENTO-2']['_NOME-GRANDE-AREA-DO-CONHECIMENTO'],
        nomeDaAreaDoConhecimento:
          data['AREA-DO-CONHECIMENTO-2']['_NOME-DA-AREA-DO-CONHECIMENTO'],
        nomeDaSubAreaDoConhecimento:
          data['AREA-DO-CONHECIMENTO-2']['_NOME-DA-SUB-AREA-DO-CONHECIMENTO'],
        nomeDaEspecialidade:
          data['AREA-DO-CONHECIMENTO-2']['_NOME-DA-ESPECIALIDADE'],
      };
    }
    if (data['AREA-DO-CONHECIMENTO-3']) {
      areasDoConhecimento.areaDoConhecimento3 = {
        nomeGrandeAreaDoConhecimento:
          data['AREA-DO-CONHECIMENTO-3']['_NOME-GRANDE-AREA-DO-CONHECIMENTO'],
        nomeDaAreaDoConhecimento:
          data['AREA-DO-CONHECIMENTO-3']['_NOME-DA-AREA-DO-CONHECIMENTO'],
        nomeDaSubAreaDoConhecimento:
          data['AREA-DO-CONHECIMENTO-3']['_NOME-DA-SUB-AREA-DO-CONHECIMENTO'],
        nomeDaEspecialidade:
          data['AREA-DO-CONHECIMENTO-3']['_NOME-DA-ESPECIALIDADE'],
      };
    }
    return areasDoConhecimento;
  }
}
