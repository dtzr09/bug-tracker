import React, { useEffect, useState } from "react";
import {
  addTicket,
  getTicketsByProjectID,
} from "../../../../api/firebase/tickets";
import styles from "./_tickets.module.scss";
import { Plus } from "react-bootstrap-icons";
import TicketStatus from "./TicketStatus";
import { convertString } from "../../../_shared/utils";
import TicketForm from "./TicketForm";
import { ticketForm } from "../../../_shared/constants";
import { v4 as uuidv4 } from "uuid";
import Alert from "../../../alert/Alert";

function Tickets({ project }) {
  const [tickets, setTickets] = useState();
  const [currentTab, setCurrentTab] = useState();
  const [ticketform, setticketform] = useState(ticketForm);
  const tabs = ["Todo", "In Progress", "Completed", "In Review"];
  const [error, setError] = useState();
  const [alertStatus, setStatus] = useState({ check: false, status: "" });
  const toggleAlertVisibility = () => {
    setStatus({ check: false, status: "" });
  };

  useEffect(() => {
    const timeoutId = setTimeout(toggleAlertVisibility, 5000);
  }, [alertStatus.check]);

  useEffect(() => {
    if (project && currentTab && ticketform) {
      setticketform({
        ...ticketform,
        members: project.members,
        uid: uuidv4(),
        project_id: project.id,
        project_name: project.name,
        status: currentTab,
      });
    }
  }, [currentTab, project]);

  const saveForm = () => {
    if (addTicket({ ticketData: ticketform })) {
      setStatus({ check: true, status: "success" });
      setError("Something went wrong, please refresh and try again.");
    } else {
      setStatus({ check: true, status: "error" });
    }
  };

  useEffect(() => {
    getTicketsByProjectID(project.id).then((res) => setTickets(res));
  }, [alertStatus.status]);

  return (
    <div className={styles.container}>
      <div className={styles.ticketContainer}>
        {tabs.map((tab) => (
          <div className={styles.headerContainer}>
            <div>{tab}</div>
            <Plus
              type="submit"
              data-toggle="modal"
              data-target="#form"
              id={convertString(tab)}
              onClick={(e) => setCurrentTab(e.target.id)}
              fontSize={30}
              style={{ cursor: "pointer" }}
            />
          </div>
        ))}
        {tickets &&
          tabs.map((tab) => (
            <TicketStatus
              ticketsData={tickets.filter(
                (ticket) => ticket.status == convertString(tab)
              )}
            />
          ))}
      </div>

      {/* Modal */}
      <div
        class="modal fade"
        id="form"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
        style={{ color: "black" }}
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Create a new ticket
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <TicketForm
                ticketform={ticketform}
                setticketform={setticketform}
                project={project}
                currentTab={currentTab}
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                // onClick={() => resetForm()}
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => saveForm()}
                data-dismiss="modal"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      {alertStatus.check ? (
        <div className={styles.alert}>
          <Alert name="Ticket" status={alertStatus.status} errorMsg={error} />
        </div>
      ) : null}
    </div>
  );
}

export default Tickets;
