// import Image from "next/image";

import styles from "./page.module.css";
import { Button } from "fusion-ui/button";
import { EditableTable } from './components/EditableTable';

function Gradient({
  conic,
  className,
  small,
}: {
  small?: boolean;
  conic?: boolean;
  className?: string;
}) {
  return (
    <span
      className={[
        styles.gradient,
        conic ? styles.glowConic : undefined,
        small ? styles.gradientSmall : styles.gradientLarge,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}


export default function Page() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <EditableTable />
      </div>
    </main>
  );
}
