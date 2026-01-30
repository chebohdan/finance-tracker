import type { PageInfo } from "../../../types/types";
import Button from "../../Button/Button";

type PagionationProps<T> = {
  pageInfo: PageInfo<T>;
  onPageSelect: (page: number) => void;
};

function Pagination<T>({
  pageInfo,
  onPageSelect,
}: Readonly<PagionationProps<T>>) {
  return (
    <nav aria-label="Page navigation example" className="flex justify-center">
      <ul className="flex gap-1 text-sm p-5">
        <li>
          <Button className="flex items-center justify-center bg-[var(--color-dark-surface)] text-[var(--color-dark-text)] border border-[var(--color-dark-bg)] hover:bg-[var(--color-accent)] hover:text-white font-medium w-9 h-9 rounded-md focus:outline-none">
            Previous
          </Button>
        </li>
        {Array.from({ length: pageInfo.totalPages }, (_, page) => (
          <li key={page}>
            <Button
              onClick={() => onPageSelect(page)}
              className="flex items-center justify-center bg-[var(--color-dark-surface)] text-[var(--color-dark-text)] border border-[var(--color-dark-bg)] hover:bg-[var(--color-accent)] hover:text-white font-medium w-9 h-9 rounded-md focus:outline-none"
            >
              {page + 1}
            </Button>
          </li>
        ))}

        <li>
          <Button className="flex items-center justify-center bg-[var(--color-dark-surface)] text-[var(--color-dark-text)] border border-[var(--color-dark-bg)] hover:bg-[var(--color-accent)] hover:text-white font-medium px-3 h-9 rounded-md focus:outline-none">
            Next
          </Button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
