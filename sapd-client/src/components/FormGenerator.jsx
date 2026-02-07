/**
 * Componente de Formulário Dinâmico da Aplicação.
 */

import React from "react";
import { Link } from "react-router-dom";

export default function DynamicForm({ config, customCss, children }) {
  const { fields, title, onSubmit, navigationItems } = config;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.();
  };

  return (
    <form
      className={customCss || "default-form-container"}
      onSubmit={handleSubmit}
    >
      {title && <h2>{title}</h2>}

      <div className="form-grid">
        {fields.map((field) => (
          <div
            key={field.name}
            className={`form-group ${field.inline ? "inline" : ""}`}
          >
            {/* CHECKBOX */}
            {field.type === "checkbox" && (
              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={!!field.value}
                  onChange={(e) => field.onchange?.(e.target.checked)}
                />
                {field.label}
              </label>
            )}

            {/* SELECT */}
            {field.type === "select" && (
              <>
                <label>{field.label}</label>
                <select
                  value={field.value ?? ""}
                  onChange={(e) => field.onchange?.(e.target.value)}
                >
                  <option value="">Selecione...</option>
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </>
            )}

            {/* INPUT PADRÃO */}
            {field.type !== "checkbox" && field.type !== "select" && (
              <>
                <label>{field.label}</label>
                <input
                  type={field.type}
                  value={field.value ?? ""}
                  onChange={(e) =>
                    field.onchange?.(
                      field.type === "number"
                        ? Math.max(
                            field.min ?? 0,
                            Math.min(field.max ?? 9999, e.target.value)
                          )
                        : e.target.value
                    )
                  }
                />
              </>
            )}
          </div>
        ))}
      </div>

      {/* Navegação */}
      {navigationItems && navigationItems.length > 0 && (
        <div className="form-navigation">
          {navigationItems.map((item, index) => (
            <p key={index}>
              {item.label} <Link to={item.to}>{item.actionLabel}</Link>
            </p>
          ))}
        </div>
      )}

      {children}

      <button type="submit">{title}</button>
    </form>
  );
}
