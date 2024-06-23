"use client";

import styles from "./index.module.css";
import { UploadFile } from "./_components/uploadFile/upload-file";
import { FileListing } from "./_components/fileList/file-list";
import { FileStats } from "./_components/fileList/file-stats";
import { ShareButton } from "./_components/shareButton/share-button";
import { AppToolTip } from "./_components/toolTip/tool-tip";
import { ShareModal } from "./_components/shareModal/rules-modal";
import { useState } from "react";
import { ThemeToggler } from "./_components/themeToggler/theme-toggler";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <main className={styles.main}>
      {showModal && 
        <ShareModal close={() => setShowModal(false)}/>
      }
      <ThemeToggler />
      <h1 className={styles.title}>
        UploadTempThing
      </h1>
      <p className={styles.subtitle}>
        Quick and easy way to share <span className={styles.primarySpan}>temporary</span> file
      </p>
      <AppToolTip />
      <UploadFile />
      <FileStats />
      <FileListing />
      <ShareButton onClick={() => setShowModal(true)}/>
    </main>
  );
}