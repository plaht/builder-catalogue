'use client';

import React from 'react';
import { Select, Option } from '@/materialui';

const CoverageSelect = () => {
  return (
    <Select className="bg-white" label="Select coverage" disabled value="50%">
      <Option>100%</Option>
      <Option>80%</Option>
      <Option>60%</Option>
      <Option>50%</Option>
      <Option>40%</Option>
      <Option>20%</Option>
    </Select>
  );
};

export default CoverageSelect;
