import { useState, type FormEvent } from "react";
import styles from "./SearchBar.module.css";

type Props = {
  value: string;
  placeholder?: string;
  onSearch: (value: string) => void;
};

export default function SearchBar({ value, placeholder = "Search", onSearch }: Props) {
  const [keyword, setKeyword] = useState(value);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(keyword.trim());
  }

  return (
    <form className={styles.search} onSubmit={handleSubmit}>
      <input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder={placeholder} />
      <button aria-label="검색">⌕</button>
    </form>
  );
}
