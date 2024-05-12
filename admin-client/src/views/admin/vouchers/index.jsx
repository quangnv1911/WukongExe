// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import DevelopmentTable from "views/admin/vouchers/components/DevelopmentTable";
import CheckTable from "views/admin/vouchers/components/CheckTable";
import ColumnsTable from "views/admin/vouchers/components/ColumnsTable";
import ComplexTable from "views/admin/vouchers/components/ComplexTable";
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from "views/admin/vouchers/variables/columnsData";
import tableDataDevelopment from "views/admin/vouchers/variables/tableDataDevelopment.json";
import tableDataCheck from "views/admin/vouchers/variables/tableDataCheck.json";
import tableDataColumns from "views/admin/vouchers/variables/tableDataColumns.json";
import tableDataComplex from "views/admin/vouchers/variables/tableDataComplex.json";
import React from "react";

export default function Settings() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: "20px", xl: "20px" }}>
        {/* <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={tableDataDevelopment}
        /> */}
        {/* <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} /> */}
        <ColumnsTable
          columnsData={columnsDataColumns}
          tableData={tableDataColumns}
        />
        {/* <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        /> */}
      </SimpleGrid>
    </Box>
  );
}
