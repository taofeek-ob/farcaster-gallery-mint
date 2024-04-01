import styles from "./page.module.css";

import { getFrameMetadata } from "frog/next";
import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const url ="https://frame-gallery-dusky.vercel.app";
  const frameMetadata = await getFrameMetadata(`${url}/api`);
  return {
    other: frameMetadata,
  };
}
export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Link
          href="https://opensea.io/collection/shapes-45"
          style={{
            background: "gold",
            padding: "1rem",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            color: "black",
            fontWeight: "bold",
            width: "11rem",
          }}
        >
          OpenSea
        </Link>
        <Link
          href="https://opensea.io/collection/shapes-45"
          style={{
            background: "gold",
            padding: "1rem",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            color: "black",
            fontWeight: "bold",
            width: "11rem",
          }}
        >
          Mint on Farcaster
        </Link>
      </div>
    </main>
  );
}
