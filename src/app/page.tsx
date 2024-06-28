import styles from "./index.module.css";
import { Navbar } from "./_components/navBar/navbar";
import { FileDropArea } from "./_components/fileDropArea/file-drop-area";
import { ToastList } from "./_components/toast/toast-list";

export default async function Home() {
  return (
    <main className={styles.main}>
      <Navbar />
      <h1 className={styles.title}>
        UploadTempThing
      </h1>
      <p className={styles.subtitle}>
        Quick and easy way to share <span className={styles.primarySpan}>temporary</span> files
      </p>
      <ul className={styles.featureList}>
        <li><span className={styles.primarySpan}>✓</span> Temporary File Storing</li>
        <li><span className={styles.primarySpan}>✓</span> Private and Secure</li>
        <li><span className={styles.primarySpan}>✓</span> Another Cool Thing</li>
      </ul>
      <FileDropArea />
      <ToastList />
    </main>
  );
}