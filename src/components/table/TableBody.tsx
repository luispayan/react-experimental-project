type TableBodyProps = {
    children: React.ReactNode;
    className?: string;
};

const TableBody: React.FC<TableBodyProps> = ({ children, className }) => (
    <tbody className={`${className}`}>
        {children}
    </tbody>
);
  
export default TableBody;