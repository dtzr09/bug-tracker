import React from "react";
import TicketCard from "./TicketCard";
import styles from "../tickets/_tickets.module.scss";

function TicketStatus({ ticketsData }) {
  return (
    <div className={styles.ticketsContainer}>
      {ticketsData
        ? ticketsData.map((ticket) => <TicketCard ticketData={ticket} />)
        : null}
    </div>
  );
}

export default TicketStatus;
