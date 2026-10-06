import { useId, useRef, useState } from "react";

function TodoItem ({ todo, index, toggleComplete, editTodo, removeTodo }) {
    // Estado da edição: se o campo está aberto e o texto digitado nele
    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState(todo.text);
    // Marca que a edição foi fechada pelo teclado (Enter ou Esc):
    // o blur que vem depois é ignorado e o foco volta para o botão "editar".
    const closedByKeyRef = useRef(false);
    const hintId = useId();

    // Ref callback: quando o botão "editar" volta à tela depois de fechar com o teclado, ele recebe o foco.
    const focusEditButton = (el) => {
        if (el && closedByKeyRef.current) {
            closedByKeyRef.current = false;
            el.focus();
        }
    };

    // Abre o campo de edição com o texto atual
    const startEditing = () => {
        closedByKeyRef.current = false;
        setDraft(todo.text);
        setIsEditing(true);
    };

    // Salva o texto editado (se ficar vazio, a tarefa mantém o texto original)
    const saveEdit = () => {
        const text = draft.trim();
        if (text && text !== todo.text) {
            editTodo(todo.id, text);
        }
    };

    // preventDefault impede que o Enter "clique" no botão editar, que recebe o foco ao fechar
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            saveEdit();
            closedByKeyRef.current = true;
            setIsEditing(false);
        }
        if (e.key === 'Escape') {
            e.preventDefault();
            closedByKeyRef.current = true;
            setIsEditing(false);
        }
    };

    const handleBlur = () => {
        if (closedByKeyRef.current) return;
        saveEdit();
        setIsEditing(false);
    };

    // Coloca o cursor no fim do texto ao abrir a edição
    const moveCursorToEnd = (e) => {
        const end = e.target.value.length;
        e.target.setSelectionRange(end, end);
    };

    return (
        <li
         className={`todo-item ${todo.completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}
         style={{ '--i': index }}>
            <input
             type="checkbox"
             className="todo-check"
             checked={todo.completed}
             onChange={() => toggleComplete(todo.id)}
             aria-label={todo.text}
            />
            {isEditing ? (
                <div className="todo-edit-wrap">
                    <input
                     type="text"
                     className="todo-edit"
                     value={draft}
                     onChange={(e) => setDraft(e.target.value)}
                     onKeyDown={handleKeyDown}
                     onBlur={handleBlur}
                     onFocus={moveCursorToEnd}
                     aria-label="Editar tarefa"
                     aria-describedby={hintId}
                     autoFocus
                    />
                    <span id={hintId} className="todo-edit-hint">Enter salva · Esc cancela</span>
                </div>
            ) : (
                <>
                    <span className="todo-text" onDoubleClick={startEditing}>
                        <span className="todo-label">{todo.text}</span>
                    </span>
                    <div className="todo-actions">
                        <button
                         type="button"
                         ref={focusEditButton}
                         onClick={startEditing}
                         className="edit-btn"
                         aria-label={`Editar "${todo.text}"`}>
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M4 20h4L19 9l-4-4L4 16v4zM14 6l4 4" />
                            </svg>
                            <span className="edit-label">editar</span>
                        </button>
                        <button
                         type="button"
                         onClick={() => removeTodo(todo.id)}
                         className="remove-btn"
                         aria-label={`Remover "${todo.text}"`}>
                            &times;
                        </button>
                    </div>
                </>
            )}
        </li>
    )
}
export default TodoItem;
