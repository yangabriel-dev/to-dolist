import { Fragment } from "react";

// Opções de filtro exibidas como botões
const FILTERS = [
    { value: 'all', label: 'Todas' },
    { value: 'active', label: 'Ativas' },
    { value: 'completed', label: 'Concluídas' },
];

function TodoFilter({ filter, setFilter }) {
    return (
        <div className="todo-filter" role="group" aria-label="Filtrar tarefas">
            {FILTERS.map(({ value, label }, index) => (
                <Fragment key={value}>
                    {index > 0 && <span className="filter-sep" aria-hidden="true">·</span>}
                    <button
                     type="button"
                     className={filter === value ? 'active' : ''}
                     aria-pressed={filter === value}
                     onClick={() => setFilter(value)}>
                        {label}
                    </button>
                </Fragment>
            ))}
        </div>
    )
}
export default TodoFilter;
