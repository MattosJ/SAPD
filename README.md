# 🩺 Sistema Para Auxiliar Pessoas com Diabetes - **SAPD**

> Queremos oferecer uma plataforma completa para que pessoas com diabetes atinjam uma **melhor qualidade de vida** e mantenham o **controle efetivo de sua condição**.  
> Nosso objetivo é transformar o gerenciamento da diabetes em um processo proativo, simples e empoderador.

---

## 🧠 Sobre o Projeto

Este projeto é uma **aplicação full-stack** desenvolvida em uma **arquitetura Cliente/Servidor**, seguindo o padrão **MVC (Model-View-Controller)** e os princípios **SOLID**.  
O desenvolvimento é **colaborativo**, utilizando **métodos ágeis** para garantir entregas incrementais e contínuas.

---

## 🛠️ Stack Tecnológico

| Camada | Tecnologia | Framework/Biblioteca | Padrão de Projeto |
| :--- | :--- | :--- | :--- |
| **Front-end (Cliente)** | JavaScript / TypeScript | React | Single Page Application (SPA) |
| **Back-end (Servidor)** | JavaScript / TypeScript (Node.js) | Express | MVC (Model-View-Controller) |
| **Banco de Dados** | *A definir* | *A definir* (ex: PostgreSQL, MySQL ou MongoDB) | Repository Pattern |

---

## 👥 Colaboração e Padronização

### 🧩 Princípios SOLID (Com Exemplos)

| Princípio | Descrição | O que Fazer ✅ | O que Evitar ❌ |
| :--- | :--- | :--- | :--- |
| **S – Single Responsibility Principle** | Cada módulo, classe ou função deve ter **uma única responsabilidade**. | Criar funções que executem **apenas uma tarefa clara**. <br>Ex: `calculateIMC()` só calcula IMC. | Funções com múltiplas lógicas. <br>Ex: `saveUser()` que também envia e-mail. |
| **O – Open/Closed Principle** | O código deve estar **aberto para extensão**, mas **fechado para modificação**. | Usar **interfaces** ou **classes base** para permitir novas implementações. | Alterar código existente para adicionar novo comportamento. |
| **L – Liskov Substitution Principle** | Subclasses devem poder **substituir suas superclasses** sem quebrar o código. | Garantir que métodos herdados mantenham o comportamento esperado. | Sobrescrever métodos mudando o propósito original. |
| **I – Interface Segregation Principle** | Evite interfaces “inchadas”. Prefira **várias pequenas interfaces específicas**. | Criar interfaces pequenas e coesas. | Criar uma interface única com dezenas de métodos obrigatórios. |
| **D – Dependency Inversion Principle** | Módulos de alto nível não devem depender de módulos de baixo nível, e sim de **abstrações**. | Usar **injeção de dependência** ou **fábricas** para reduzir acoplamento. | Importar diretamente dependências concretas dentro de módulos principais. |

---

## Padrões de Código

### 1. Indentação
- Utilize **2 espaços** em todos os arquivos (`.js`, `.ts`, `.jsx`, `.tsx`, `.json`).
- Use **Prettier** para garantir formatação automática.

### 2.Nomenclatura

| Tipo                          | Padrão                  | Exemplo                                 |
| :---------------------------- | :---------------------- | :-------------------------------------- |
| Variáveis, Funções, Métodos   | `camelCase`             | `userData`, `calculateTotal()`          |
| Componentes React e Classes   | `PascalCase`            | `<UserProfile />`, `UserModel`          |
| Constantes Globais            | `SCREAMING_SNAKE_CASE`  | `API_URL`, `MAX_GLICEMIA`               |
| Nomes de arquivos React       | `PascalCase.jsx / .tsx` | `UserProfile.jsx`                       |
| Nomes de arquivos utilitários | `kebab-case.js / .ts`   | `format-date.js`                        |
| Nomes de diretórios           | `kebab-case`            | `components`, `services`, `controllers` |


### 3. Comentários 
  ex: 
  /**
 * Calcula o IMC de um paciente.
 * @param {number} weight - Peso em kg.
 * @param {number} height - Altura em metros.
 * @returns {number} O valor do IMC.
 */

 export function calculateBMI(weight, height) {
  return weight / (height * height);
  }


## Padrões de Commits

  <tipo>(escopo): descrição breve

    | Tipo         | Descrição                                           |
    | :----------- | :-------------------------------------------------- |
    | **feat**     | Nova funcionalidade                                 |
    | **fix**      | Correção de bug                                     |
    | **refactor** | Refatoração de código (sem mudar comportamento)     |
    | **docs**     | Alterações na documentação                          |
    | **style**    | Ajustes de formatação (indentação, espaços, etc.)   |
    | **test**     | Adição/modificação de testes                        |
    | **chore**    | Tarefas de build, dependências, configurações, etc. |

    ex :
      feat(auth): adiciona validação de token JWT
      fix(api): corrige erro 500 ao criar registro de glicemia
      docs(readme): adiciona seção sobre SOLID

