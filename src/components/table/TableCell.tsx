type TableCellProps = {
    children: React.ReactNode;
    className?: string;
    align?: "left" | "center" | "right" | "justify" | "char";
};

const TableCell: React.FC<TableCellProps> = ({ children, className, align }) => (
    <td className={`p-2 ${className}`} align={align}>
        {children}
    </td>
);
  
export default TableCell;