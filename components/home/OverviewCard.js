import styles from "@/styles/Home.module.css";

export default function OverviewCard({ title, value }) {
  return (
    <>
      <div className={styles.card_container}>
        <div className={styles.card_header}>
          <p className="mb-2">{title}</p>
          <hr className="m-0" />
        </div>
        <h2 className={styles.value}>
          {new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "MAD",
          })
            .format(value)
            .replace("MAD", "")}{" "}
          <br />
          MAD
        </h2>
      </div>
    </>
  );
}
