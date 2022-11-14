import React from "react";
import { useRouter } from "next/router";

export default function DetailArtikel() {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <>
      <div>DetailArtikel {slug}</div>
    </>
  );
}
