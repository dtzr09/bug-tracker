import React from "react";
import styles from "./_tickets.module.scss";

function TicketCard({ ticketData }) {
  const { name, members, comments, uid } = ticketData;
  return (
    <div className={styles.ticketcard}>
      <div>{name}</div>
      <div>{members && members.map((member) => <div>{member}</div>)}</div>
    </div>
  );
}

export default TicketCard;
