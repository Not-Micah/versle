"use client";

import GuideModal from "@/components/GuideModal";
import ResultsModal from "@/components/ResultsModal";
import { useEffect, useState } from "react";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ResultsModal />
      <GuideModal />
    </>
  );
};

export default ModalProvider;