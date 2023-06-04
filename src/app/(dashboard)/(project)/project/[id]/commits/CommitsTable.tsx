'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Typography, Checkbox } from "@material-tailwind/react";

interface TableRow {
  id: number;
  title: string;
  description: string;
}

const rows: TableRow[] = [
  { id: 1, title: "Title 1", description: "Description 1" },
  { id: 2, title: "Title 2", description: "Description 2" },
  { id: 3, title: "Title 3", description: "Description 3" },
];

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({ opacity: 1, transition: { delay: i * 0.1 } }),
};

export default function TableCard() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const toggleSelectAll = () => {
    if (selectedRows.length === rows.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(rows.map((row) => row.id));
    }
  };

  const toggleRowSelection = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  return (
    <Card className="p-4 shadow-sm lg:w-[70vw] w-[90vw] ">

      <div className="flex items-center mb-4">
        <Checkbox color="blue" onChange={toggleSelectAll} />
        <Typography variant="h6" className="ml-2">
          {selectedRows.length} row(s) selected
        </Typography>
      </div>
          <AnimatePresence>
            {rows.map((row, index) => (
              <motion.tr
                key={row.id}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={staggerVariants}
                custom={index}
              >
                <Card className="p-4 my-3 shadow-md cursor-pointer mx-2" onClick={()=>toggleRowSelection(row.id)}>
                    <div className="flex items-center">
                  <Checkbox
                    color="blue"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => toggleRowSelection(row.id)}
                  />
                <div >
                  <Typography variant="h6" className='text-blue-gray-800 '>{row.title}</Typography>
                  <Typography variant="body2">{row.description}</Typography>
                </div>
                </div>
                </Card>
              </motion.tr>
            ))}
          </AnimatePresence>
  
    </Card>
  );
}
