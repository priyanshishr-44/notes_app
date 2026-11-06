import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Dashboard() {
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchNotes = async () => {
    try {
      const response = await API.get("/note");
      setNotes(response.data);
    } catch (error) {
      console.log(error);
      setMessage("Unable to load notes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      fetchNotes();
    }
  }, []);

  const resetEditor = () => {
    setTitle("");
    setContent("");
    setEditingId(null);
    setShowEditor(false);
  };

  // CREATE AND UPDATE NOTE
  const saveNote = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setMessage("Please enter both title and content.");
      return;
    }

    try {
      setSaving(true);
      setMessage("");

      if (editingId) {
        await API.put("/note/update/" + editingId, {
          title: title.trim(),
          content: content.trim()
        });

        setMessage("Your note has been updated successfully!");
      } else {
        await API.post("/note/create", {
          title: title.trim(),
          content: content.trim()
        });

        setMessage("Your new note has been created successfully!");
      }

      setTitle("");
      setContent("");
      setEditingId(null);
      setShowEditor(false);

      await fetchNotes();

    } catch (error) {
      console.log("Save Note Error:", error);
      setMessage(
        error.response?.data?.msg ||
        error.response?.data ||
        "Unable to save note. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  // EDIT NOTE
  const editNote = (note) => {
    setEditingId(note._id);
    setTitle(note.title);
    setContent(note.content);
    setShowEditor(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // DELETE NOTE
  const deleteNote = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    }

    try {
      await API.delete("/note/delete/" + id);
      setMessage("Note deleted successfully!");
      await fetchNotes();
    } catch (error) {
      console.log(error);
      setMessage("Unable to delete note.");
    }
  };

  // LOGOUT
  const logout = async () => {
    try {
      await API.post("/user/logout");
    } catch (error) {
      console.log(error);
    }

    localStorage.removeItem("token");
    navigate("/login");
  };

  const filteredNotes = notes.filter((note) =>
    (note.title + " " + note.content)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  return (
    <div className="workspace">

      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">N</div>
          <span>NoteSpace<span className="brand-dot">.</span></span>
        </div>

        <p className="sidebar-label">WORKSPACE</p>

        <nav className="side-nav">
          <a href="#overview" className="nav-item active">
            <span>◈</span> Overview
          </a>

          <a href="#my-notes" className="nav-item">
            <span>▤</span> My Notes
          </a>

          <button
            className="nav-item"
            onClick={() => {
              resetEditor();
              setShowEditor(true);
            }}
          >
            <span>＋</span> Create Note
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-tip">
            <span>✦</span>
            <h4>A little reminder</h4>
            <p>Your ideas deserve a place to grow.</p>
          </div>

          <button className="logout-btn" onClick={logout}>
            ↪ &nbsp; Logout
          </button>
        </div>
      </aside>

      <div className="workspace-main">

        <header className="topbar">
          <div>
            <span className="topbar-small">YOUR PERSONAL WORKSPACE</span>
            <h2>Good to see you! <span>✦</span></h2>
          </div>

          <div className="topbar-date">
            <span>◷</span> {today}
          </div>
        </header>

        <main className="workspace-content" id="overview">

          <section className="welcome-banner">
            <div className="welcome-text">
              <span className="welcome-tag">✦ YOUR CREATIVE SPACE</span>

              <h1>Think it. Write it.<br />Remember it.</h1>

              <p>
                All your thoughts, plans and ideas — beautifully organised in one place.
              </p>

              <button
                className="banner-btn"
                onClick={() => {
                  resetEditor();
                  setShowEditor(true);
                }}
              >
                + Create a Note
              </button>
            </div>

            <div className="banner-art">
              <div className="art-circle">
                <span>✎</span>
              </div>
              <div className="floating-card card-one">✦ Ideas</div>
              <div className="floating-card card-two">♡ Create</div>
              <div className="floating-card card-three">✧ Focus</div>
            </div>
          </section>

          <section className="stats-grid">

            <div className="stat-card">
              <div className="stat-icon purple-icon">▤</div>
              <div>
                <p>Total Notes</p>
                <h2>{notes.length}</h2>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon pink-icon">✧</div>
              <div>
                <p>Your Workspace</p>
                <h2>Personal</h2>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon peach-icon">✎</div>
              <div>
                <p>Keep Creating</p>
                <h2>Every Day</h2>
              </div>
            </div>

          </section>

          {message && (
            <div className="status-message">
              {message}
              <button onClick={() => setMessage("")}>×</button>
            </div>
          )}

          {showEditor && (
            <section className="editor-card">

              <div className="section-heading">
                <div>
                  <span className="section-kicker">YOUR IDEAS</span>
                  <h2>{editingId ? "Edit your note" : "Create something new"}</h2>
                </div>

                <button className="close-editor" onClick={resetEditor}>
                  ×
                </button>
              </div>

              <form onSubmit={saveNote}>

                <input
                  type="text"
                  placeholder="Give your note a title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />

                <textarea
                  placeholder="Start writing your thoughts here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />

                <div className="editor-actions">

                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={resetEditor}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="save-btn"
                    disabled={saving}
                  >
                    {saving
                      ? "Saving..."
                      : editingId
                      ? "Save Changes →"
                      : "Save Note →"}
                  </button>

                </div>
              </form>
            </section>
          )}

          <section className="notes-section" id="my-notes">

            <div className="section-heading">
              <div>
                <span className="section-kicker">YOUR COLLECTION</span>
                <h2>
                  My Notes <span className="note-count">{notes.length}</span>
                </h2>
              </div>

              <button
                className="new-note-btn"
                onClick={() => {
                  resetEditor();
                  setShowEditor(true);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                + New Note
              </button>
            </div>

            <div className="search-box">
              <span>⌕</span>

              <input
                type="text"
                placeholder="Search your notes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {loading ? (
              <p className="empty-state">Loading your notes...</p>
            ) : filteredNotes.length === 0 ? (
              <div className="empty-state">
                <div>✧</div>
                <h3>{search ? "No matching notes" : "Your space is waiting!"}</h3>
                <p>
                  {search
                    ? "Try searching with another keyword."
                    : "Create your first note and start collecting your ideas."}
                </p>
              </div>
            ) : (
              <div className="premium-notes-grid">

                {filteredNotes.map((note, index) => (
                  <article
                    className={"premium-note note-color-" + (index % 4)}
                    key={note._id}
                  >
                    <div className="note-card-top">
                      <span className="note-category">✦ MY NOTE</span>
                      <span className="note-decoration">✧</span>
                    </div>

                    <h3>{note.title}</h3>

                    <p className="note-content">{note.content}</p>

                    <div className="note-card-footer">
                      <span>♡ NoteSpace</span>

                      <div>
                        <button
                          className="edit-icon"
                          onClick={() => editNote(note)}
                          title="Edit note"
                        >
                          ✎
                        </button>

                        <button
                          className="delete-icon"
                          onClick={() => deleteNote(note._id)}
                          title="Delete note"
                        >
                          ♧
                        </button>
                      </div>
                    </div>
                  </article>
                ))}

              </div>
            )}

          </section>

          <footer className="workspace-footer">
            Made with care <span>♥</span> in NoteSpace.
          </footer>

        </main>
      </div>
    </div>
  );
}

export default Dashboard;