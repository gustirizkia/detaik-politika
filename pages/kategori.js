import React from "react";

export async function getServerSideProps(context) {
  console.log("context", context);
  return {
    props: {},
  };
}

export default function Kategori() {
  return <div>Kategori</div>;
}
