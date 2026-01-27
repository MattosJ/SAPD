/**
 * Componente de Formulário Dinâmico da Aplicação.
 * 
 *   - Este componente gera automaticamente campos de formulário
 *     com base na configuração passada via `config`.
 * 
 *   - Pode ser reutilizado para criar diferentes formulários,
 *     como login, registro, lembretes, medições, etc.
 * 
 *   - `config` controla os campos, título e função de envio.
 *   - `customCss` permite sobrescrever o estilo padrão.
 *   - `children` permite inserir conteúdo extra dentro do form
 *     (links, botões adicionais, mensagens, etc.).
 */

import React, { useState } from "react";

export default function DynamicForm({ config, customCss, children }) {

  // Extrai informações essenciais da configuração enviada.
  // - fields = lista de campos do formulário
  // - title = título opcional exibido no topo
  // - onSubmit = função executada ao enviar o formulário
  const { fields, title, onSubmit } = config;

  /**
   * Estado interno do formulário
   * 
   * - Cria um objeto onde cada chave é o nome do campo.
   * - Campos do tipo checkbox iniciam como false.
   * - Os demais iniciam como string vazia.
   */
  const [formData, setFormData] = useState(
    Object.fromEntries(fields.map(f => [
      f.name,
      f.type === "checkbox" ? false : ""
    ]))
  );

  /**
   * Manipula alterações nos inputs do formulário.
   * 
   * - Para checkbox, pega o valor marcado (true/false).
   * - Para números, aplica limite min/max caso existam.
   * - Atualiza o estado `formData` com o novo valor.
   */
  const handleChange = (e, field) => {
    let value = field.type === "checkbox"
      ? e.target.checked
      : e.target.value;

    if (field.type === "number") {
      value = Math.max(
        field.min ?? 0,
        Math.min(field.max ?? 9999, value)
      );
    }

    setFormData({ ...formData, [field.name]: value });
  };

  /**
   * Intercepta o envio do formulário.
   * 
   * - Impede o comportamento padrão do HTML (recarregar página).
   * - Chama a função `onSubmit` enviada pelo componente pai,
   *   passando todos os dados preenchidos.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  /**
   * Renderização do formulário.
   * 
   * - Gera cada campo dinamicamente de acordo com `fields`.
   * - Suporte especial para checkbox.
   * - `children` permite conteúdo adicional abaixo dos inputs.
   */
  return (
    <form
      className={customCss || "default-form-container"}
      onSubmit={handleSubmit}
    >
      {title && <h2>{title}</h2>}

      {fields.map((field) => (
        <div className="form-group" key={field.name}>

          {field.type !== "checkbox" ? (
            <>
              <label>{field.label}</label>

              <input
                type={field.type}
                value={formData[field.name]}
                onChange={(e) => handleChange(e, field)}
              />
            </>
          ) : (
            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={formData[field.name]}
                onChange={(e) => handleChange(e, field)}
              />
              {field.label}
            </label>
          )}

        </div>
      ))}

      {/* Conteúdo extra opcional enviado pelo componente pai */}
      {children}

      <button type="submit">Registrar</button>
    </form>
  );
}
