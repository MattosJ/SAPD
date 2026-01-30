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

      {fields.map((field) => (
        <div className="form-group" key={field.name}>
          {field.type !== "checkbox" ? (
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
          ) : (
            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={!!field.value}
                onChange={(e) => field.onchange?.(e.target.checked)}
              />
              {field.label}
            </label>
          )}
        </div>
      ))}

      {/* Navegação (Login <-> Registro etc.) */}
      {navigationItems && navigationItems.length > 0 && (
        <div className="form-navigation">
          {navigationItems.map((item, index) => (
            <p key={index}>
              {item.label}{" "}
              <Link to={item.to}>{item.actionLabel}</Link>
            </p>
          ))}
        </div>
      )}

      {children}

      <button type="submit">{title}</button>
    </form>
  );
}
