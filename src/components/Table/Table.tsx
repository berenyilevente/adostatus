import { ReactElement, ReactNode } from "react";

export interface ColumnProps<T> {
  key: string;
  title: string | React.ReactElement;
}

export const Table = ({ children }: { children: ReactNode }): ReactElement => {
  return (
    <div className="overflow-auto">
      <table className="table">{children}</table>
    </div>
  );
};
