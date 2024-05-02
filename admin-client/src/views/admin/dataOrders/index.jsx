// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import DevelopmentTable from "views/admin/dataOrders/components/DevelopmentTable";
import {
  columnsDataDevelopment,
} from "views/admin/dataOrders/variables/columnsData";
import React, { useEffect, useState } from "react";
import api from "utils/Services";
import { BACK_END_HOST } from "utils/AppConfig";

export default function Settings() {

  
  
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: "20px", xl: "20px" }}>
        <DevelopmentTable
          columnsData={columnsDataDevelopment}
        />
      </SimpleGrid>
    </Box>
  );
}
