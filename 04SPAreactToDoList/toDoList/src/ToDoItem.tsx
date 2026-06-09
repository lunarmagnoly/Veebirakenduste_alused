import React, { useState } from 'react';
import type { ToDo, Status, UpdatedProject } from './types';

// Andmed, mida App komponent saadab kaardile
type Props = {
  toDo: ToDo;
  deleteToDo: (id: number) => void;
  changeStatus: (id: number, newStatus: Status) => void;
  editToDo: (id: number, updatedProject: UpdatedProject) => void;
  toggleFavorite: (id: number) => void;
};

// Ühe projekti kaart
const ToDoItem: React.FC<Props> = ({
  toDo,
  deleteToDo,
  changeStatus,
  editToDo,
  toggleFavorite
}) => {
  // Kas projekt on muutmise režiimis
  const [isEditing, setIsEditing] = useState(false);

  // Muudetavad väljad
  const [editedText, setEditedText] = useState(toDo.text);
  const [editedDescription, setEditedDescription] = useState(toDo.description);
  const [editedImageUrl, setEditedImageUrl] = useState(toDo.imageUrl);
  const [editedDeadline, setEditedDeadline] = useState(toDo.deadline);
  const [editedPriority, setEditedPriority] = useState(toDo.priority);

  // Kontrollime, kas projekti tähtaeg on möödas
  // Valmis projekt ei ole enam hilinenud
  const today = new Date();
  const deadlineDate = new Date(toDo.deadline);
  
  // Projekt on hilinenud, kui tähtaeg on möödas ja töö pole valmis
  const isOverdue =
    toDo.deadline !== "" &&
    toDo.status !== "done" &&
    deadlineDate < today;

  // Kuupäeva kuvamine Eesti formaadis (pp.kk.aaaa)
  const formatDate = (date: string) => {
    if (!date) return "";

    const d = new Date(date);

    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();

    return `${day}.${month}.${year}`;
  };

  // Kontrollime, kas tähtaeg on lähedal
  // Kollane hoiatus tuleb siis, kui projekt ei ole valmis
  const timeDifference = deadlineDate.getTime() - today.getTime();
  const daysLeft = timeDifference / (1000 * 60 * 60 * 24);

  const isDeadlineSoon =
    toDo.deadline !== "" &&
    toDo.status !== "done" &&
    daysLeft >= 0 &&
    daysLeft <= 3;

  // Prioriteedi märgi valimine
  const getPriorityIcon = () => {
    if (toDo.priority === "high") return "🔴";
    if (toDo.priority === "medium") return "🟡";
    return "🟢";
  };

  // Salvestame muudetud projekti andmed
  const saveEdit = () => {
    if (!editedText.trim()) return;

    editToDo(toDo.id, {
      text: editedText.trim(),
      description: editedDescription.trim(),
      imageUrl: editedImageUrl.trim(),
      deadline: editedDeadline,
      priority: editedPriority
    });

    setIsEditing(false);
  };

  return (
    <div
      className={`project-card ${isOverdue ? "overdue" : ""} ${isDeadlineSoon ? "soon" : ""} ${toDo.status === "done" ? "done" : ""}`}
    >
        {/* Kui kaart on muutmise režiimis, näitame vormi */}
      {isEditing ? (
        <div className="edit-form">
          <input
            className="edit-input"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            placeholder="Project title"
          />

          <textarea
            className="edit-input"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="Description"
          />

          <input
            className="edit-input"
            value={editedImageUrl}
            onChange={(e) => setEditedImageUrl(e.target.value)}
            placeholder="Image URL"
          />

          <input
            className="edit-input"
            type="date"
            value={editedDeadline}
            onChange={(e) => setEditedDeadline(e.target.value)}
          />

          <div className="priority-selector">
            <button
                type="button"
                className={editedPriority === "low" ? "active" : ""}
                onClick={() => setEditedPriority("low")}
            >
                🟢 Low
            </button>

            <button
                type="button"
                className={editedPriority === "medium" ? "active" : ""}
                onClick={() => setEditedPriority("medium")}
            >
                🟡 Medium
            </button>

            <button
                type="button"
                className={editedPriority === "high" ? "active" : ""}
                onClick={() => setEditedPriority("high")}
            >
                🔴 High
            </button>
          </div>
        </div>
      ) : (
        <>
          {toDo.imageUrl && (
            <img
              className="project-image"
              src={toDo.imageUrl}
              alt={toDo.text}
            />
          )}

          <div className="card-title-row">
            <h3>
              {getPriorityIcon()} {toDo.text}
            </h3>

            <button
              className="favorite-button"
              onClick={() => toggleFavorite(toDo.id)}
            >
              {toDo.favorite ? "⭐" : "☆"}
            </button>
          </div>

          {toDo.description && (
            <p>{toDo.description}</p>
          )}

          {toDo.deadline && (
            <p className="deadline">
              Deadline: {formatDate(toDo.deadline)}
            </p>
          )}

          {toDo.completedDate && (
            <p className="deadline">
              Completed: {formatDate(toDo.completedDate)}
            </p>
          )}
        </>
      )}

      {/* Nupud projekti liigutamiseks teise veergu */}
      <div className="move-buttons">
        {toDo.status !== "idea" && (
          <button onClick={() => changeStatus(toDo.id, "idea")}>
            ← Ideas
          </button>
        )}

        {toDo.status !== "progress" && (
          <button onClick={() => changeStatus(toDo.id, "progress")}>
            Progress
          </button>
        )}

        {toDo.status !== "done" && (
          <button onClick={() => changeStatus(toDo.id, "done")}>
            Done →
          </button>
        )}
      </div>

      <div className="card-buttons">
        {isEditing ? (
          <button onClick={saveEdit}>Save</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}

        <button onClick={() => deleteToDo(toDo.id)}>Delete</button>
      </div>
    </div>
  );
};

export default ToDoItem;