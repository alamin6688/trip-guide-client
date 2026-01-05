import CategoryManagementHeader from '@/components/modules/Admin/CategoryManagement/CategoryManagementHeader';
import CategoryTable from '@/components/modules/Admin/CategoryManagement/CategoryTable';
import RefreshButton from '@/components/shared/RefreshButton';
import { TableSkeleton } from '@/components/shared/TableSkeleton';
import { getCategories } from '@/services/admin/guidesManagement';
import React, { Suspense } from 'react';

const AdmminCategoriesManagement = async () => {
    const result = await getCategories();
    return (
       <div className="space-y-6">
      <CategoryManagementHeader />
      <div className="flex">
        <RefreshButton />
      </div>
      <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
        <CategoryTable categories={result.data} />
      </Suspense>
    </div>
    );
};

export default AdmminCategoriesManagement;