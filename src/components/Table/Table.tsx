import { ReactElement } from "react";

export interface ColumnProps<T> {
  key: string;
  title: string | React.ReactElement;
}

export const Table = ({
  children,
}: {
  children: ReactElement;
}): ReactElement => {
  return (
    <div className="overflow-auto">
      <table className="table">{children}</table>
    </div>
  );
};
