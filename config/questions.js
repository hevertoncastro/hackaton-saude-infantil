export const clinic = {
  pages: [
    {
      name: "page1",
      elements: [
        {
          type: "dropdown",
          name: "question5",
          title: "Hipótese diagnótica",
          choices: [
            {
              value: "item1",
              text: "Leucemia linfoide aguda "
            },
            {
              value: "item2",
              text: "Leucemia mieloide aguda"
            },
            {
              value: "item3",
              text: "Tumor de Wilms "
            },
            {
              value: "item4",
              text: "Retinoblastoma "
            },
            {
              value: "item5",
              text: "Tumores do sistema nervoso central"
            },
            {
              value: "item6",
              text: "Linfomas"
            }
          ]
        },
        {
          type: "radiogroup",
          name: "question1",
          title: "Início dos sintomas/sinais da doença até o hoje:",
          isRequired: true,
          choices: [
            {
              value: "item1",
              text: "<1 mês"
            },
            {
              value: "item2",
              text: "Entre 1 a 3 meses"
            },
            {
              value: "item3",
              text: "Entre 3 a 6 meses"
            },
            {
              value: "item4",
              text: "> 6 meses "
            }
          ],
          otherText: "> 6 meses "
        },
        {
          type: "checkbox",
          name: "question2",
          title: "Sintomas apresentados que levaram a investigação:",
          choices: [
            {
              value: "item1",
              text: "Letargia"
            },
            {
              value: "item2",
              text: "Fadiga"
            },
            {
              value: "item3",
              text: "Dor óssea difusa"
            },
            {
              value: "item4",
              text: "Dor óssea localizada"
            },
            {
              value: "item5",
              text: "Perda de peso"
            },
            {
              value: "item6",
              text: "Palidez"
            },
            {
              value: "item7",
              text: "Pirexia"
            },
            {
              value: "item8",
              text: "Cefaleia"
            },
            {
              value: "item9",
              text: "Sangramentos"
            },
            {
              value: "item10",
              text: "Vômitos"
            },
            {
              value: "item11",
              text: "Acometimento ocular"
            },
            {
              value: "item12",
              text: "Priapismo"
            },
            {
              value: "item13",
              text: "Sudorese noturna"
            },
            {
              value: "item14",
              text: "Inapetência"
            },
            {
              value: "item15",
              text: "Astenia"
            },
            {
              value: "item16",
              text: "Dor óssea"
            },
            {
              value: "item17",
              text: "Dor abdominal"
            }
          ],
          hasOther: true,
          otherText: "Se outros, quais?",
          colCount: 3
        },
        {
          type: "comment",
          name: "question4",
          title: "História clínica"
        },
        {
          type: "checkbox",
          name: "question3",
          title: "Paciente apresenta em exame físico:",
          choices: [
            {
              value: "item1",
              text: "Adenomegalia"
            },
            {
              value: "item2",
              text: "Esplenomegalia"
            },
            {
              value: "item3",
              text: "Neuropatia de par craniano"
            },
            {
              value: "item4",
              text: "Sinais meníngeos"
            },
            {
              value: "item5",
              text: "Inflamação testicular"
            }
          ],
          hasOther: true,
          otherText: "Se outros, quais?"
        },
        {
          type: "radiogroup",
          name: "question7",
          title: "Qual a conduta?",
          choices: [
            {
              value: "item1",
              text: "Investigar hipótese diagnóstica"
            },
            {
              value: "item2",
              text: "Alterar hipótese diagnóstica"
            }
          ]
        }
      ]
    }
  ]
};

export const exams = {
  pages: [
    {
      name: "page1",
      elements: [
        {
          type: "radiogroup",
          name: "question1",
          title: "Hemograma completo",
          choices: [
            {
              value: "item1",
              text: "Solicitar"
            },
            {
              value: "item2",
              text: "Visualizar"
            },
            {
              value: "item3",
              text: "Incluir dado"
            }
          ],
          colCount: 3
        },
        {
          type: "radiogroup",
          name: "question3",
          title: "Mielograma",
          choices: [
            {
              value: "item1",
              text: "Solicitar"
            },
            {
              value: "item2",
              text: "Visualizar"
            },
            {
              value: "item3",
              text: "Incluir dado"
            }
          ],
          colCount: 3
        },
        {
          type: "radiogroup",
          name: "question2",
          title: "Imunofenotipagem ",
          choices: [
            {
              value: "item1",
              text: "Solicitar"
            },
            {
              value: "item2",
              text: "Visualizar"
            },
            {
              value: "item3",
              text: "Incluir dado"
            }
          ],
          colCount: 3
        },
        {
          type: "radiogroup",
          name: "question4",
          title: "Citogenética",
          choices: [
            {
              value: "item1",
              text: "Solicitar"
            },
            {
              value: "item2",
              text: "Visualizar"
            },
            {
              value: "item3",
              text: "Incluir dado"
            }
          ],
          colCount: 3
        },
        {
          type: "radiogroup",
          name: "question6",
          title: "Outros",
          choices: [
            {
              value: "item1",
              text: "Solicitar"
            },
            {
              value: "item2",
              text: "Visualizar"
            },
            {
              value: "item3",
              text: "Incluir dado"
            }
          ],
          colCount: 3
        }
      ]
    }
  ]
};
