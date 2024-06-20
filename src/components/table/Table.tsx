
type TableProps = {
    children: React.ReactNode;
    className?: string;
};

const Table : React.FC<TableProps> = ({ children, className }) => (
    <table className={`w-11/12 mx-auto mt-16 bg-white ${className}`} aria-label="simple table">
      {children}
    </table>
);
  
  export default Table;