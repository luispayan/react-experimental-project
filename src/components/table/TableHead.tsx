type TableHeadProps = {
    children: React.ReactNode;
    className?: string;
};

const TableHead = ({ children, className }: TableHeadProps) => (
    <thead className={`${className}`}>
        {children}
    </thead>
);
  
export default TableHead;