// material
import { visuallyHidden } from '@mui/utils';
import { Box, Checkbox, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';

// ----------------------------------------------------------------------

type HeadLabelProps = {
  id: string;
  label?: string;
  alignRight?: boolean;
};

type ListHeadProps = {
  order: 'asc' | 'desc';
  orderBy: string;
  rowCount: number;
  headLabel: HeadLabelProps[];
  numSelected?: number;
  onRequestSort: (id: string) => void;
  onSelectAllClick?: (checked: boolean) => void;
};

export default function ListHead({
  order,
  orderBy,
  rowCount,
  headLabel,
  numSelected = 0,
  onRequestSort,
  onSelectAllClick
}: ListHeadProps) {
  return (
    <TableHead>
      <TableRow>
        {onSelectAllClick && (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                onSelectAllClick(event.target.checked)
              }
            />
          </TableCell>
        )}

        {headLabel.map((headCell: HeadLabelProps) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={() => onRequestSort(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box sx={{ ...visuallyHidden }}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
