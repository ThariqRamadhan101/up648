import { useState } from 'react';
import { useStore } from '../store/store';
import { ProvinceChart } from '../components/data/ProvinceChart';
import { IndicatorForm } from '../components/data/IndicatorForm';

type Tab = 'economics' | 'infrastructure' | 'education';

type SortState = {
    gdp: boolean;
    unemployment: boolean;
    poverty: boolean;
    infrastructure: boolean;
    urbanization: boolean;
    internet: boolean;
    literacy: boolean;
    enrollment: boolean;
    teacherRatio: boolean;
};

function Data() {
    const { provinces } = useStore();
    const [activeTab, setActiveTab] = useState<Tab>('economics');
    const [chartSort, setChartSort] = useState<SortState>({
        gdp: false,
        unemployment: false,
        poverty: false,
        infrastructure: false,
        urbanization: false,
        internet: false,
        literacy: false,
        enrollment: false,
        teacherRatio: false
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-900">Province Data Management</h2>
            </div>

            {/* Indicator Form Section */}
            <div className="bg-white rounded-lg border shadow-sm">
                <div className="p-6">
                    <div className="mb-4">
                        <h3 className="text-lg font-medium text-gray-900">Province Indicators</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Manage and update province indicators and their values
                        </p>
                    </div>
                    <IndicatorForm />
                </div>
            </div>

            {/* Province Form Section */}
            <div className="bg-white rounded-lg border shadow-sm">
                <div className="p-6">
                    <div className="mb-4">
                        <h3 className="text-lg font-medium text-gray-900">Add New Province</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Add a new province with basic information and indicators
                        </p>
                    </div>
                    {/* TODO: Add ProvinceForm component here */}
                </div>
            </div>
        </div>
    );
}

export default Data;