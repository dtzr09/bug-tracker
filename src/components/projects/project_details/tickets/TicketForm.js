import React, { useState } from "react";
import styles from "./_tickets.module.scss";

function TicketForm({ ticketform, setticketform }) {
  const [selectedTab, setTab] = useState("feature");

  const handleForm = (e) => {
    if (e.target.id == "category") {
      setTab(e.target.getAttribute("value"));
      setticketform({
        ...ticketform,
        category: e.target.getAttribute("value"),
      });
    } else {
      setticketform({
        ...ticketform,
        [e.target.id]: e.target.value,
      });
    }
  };

  const categoriesArray = ["feature", "bug"];

  return (
    <form>
      <div class="form-group">
        <label for="name">Name of Ticket</label>
        <input
          type="text"
          class="form-control"
          id="name"
          onChange={(e) => handleForm(e)}
        />
      </div>
      <div class="form-group">
        <label for="desc">Description</label>
        <textarea
          rows="2"
          type="text"
          class="form-control"
          id="description"
          onChange={(e) => handleForm(e)}
        />
      </div>
      <div class="form-group">
        <label for="label">Label</label>
        <textarea
          type="text"
          class="form-control"
          id="label"
          onChange={(e) => handleForm(e)}
        />
      </div>
      <div class="form-group">
        <label for="category">Category</label>
        <select
          multiple
          class="form-control"
          id="category"
          onChange={(e) => handleForm(e)}
        ></select>
      </div>
      <div class="form-group">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {selectedTab ? selectedTab : "Category"}
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {categoriesArray &&
            categoriesArray.map((category) => (
              <a
                id="category"
                value={category}
                onClick={(e) => handleForm(e)}
                class="dropdown-item"
                href="#"
              >
                {category}
              </a>
            ))}
        </div>
      </div>
    </form>
  );
}

export default TicketForm;
