import { useState } from 'react';
import { useStore } from '../store/store';
import { ProvinceChart } from '../components/data/ProvinceChart';

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

export default function Overview() {
    const { provinces, tasks } = useStore();
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

    // Calculate task statistics
    const taskStats = {
        total: tasks.length,
        backlog: tasks.filter(t => t.stage === 'backlog').length,
        backlogVerification: tasks.filter(t => t.stage === 'backlog-verification').length,
        procurement: tasks.filter(t => t.stage === 'procurement').length,
        procurementVerification: tasks.filter(t => t.stage === 'procurement-verification').length,
        construction: tasks.filter(t => t.stage === 'construction').length,
        constructionVerification: tasks.filter(t => t.stage === 'construction-verification').length,
        handover: tasks.filter(t => t.stage === 'handover').length,
        done: tasks.filter(t => t.stage === 'done').length,
    };

    // Calculate summary statistics
    const stats = {
        avgGDP: provinces.reduce((sum, p) => sum + p.indicators.gdp, 0) / provinces.length,
        avgUnemployment: provinces.reduce((sum, p) => sum + p.indicators.unemployment, 0) / provinces.length,
        avgPovertyRate: provinces.reduce((sum, p) => sum + p.indicators.povertyRate, 0) / provinces.length,
        avgInfrastructure: provinces.reduce((sum, p) => sum + p.indicators.infrastructureIndex, 0) / provinces.length,
        avgUrbanization: provinces.reduce((sum, p) => sum + p.indicators.urbanizationRate, 0) / provinces.length,
        avgInternet: provinces.reduce((sum, p) => sum + p.indicators.internetAccess, 0) / provinces.length,
        avgLiteracy: provinces.reduce((sum, p) => sum + p.indicators.literacyRate, 0) / provinces.length,
        avgEnrollment: provinces.reduce((sum, p) => sum + p.indicators.schoolEnrollment, 0) / provinces.length,
        avgTeacherRatio: provinces.reduce((sum, p) => sum + p.indicators.teacherRatio, 0) / provinces.length
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Province Overview</h2>

            {/* Task Overview */}
            <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Task Overview</h3>
                <div className="grid grid-cols-4 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-500">Total Tasks</div>
                        <div className="text-2xl font-semibold text-gray-900">{taskStats.total}</div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Backlog</span>
                            <span className="font-medium">{taskStats.backlog}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Backlog Verification</span>
                            <span className="font-medium">{taskStats.backlogVerification}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Procurement</span>
                            <span className="font-medium">{taskStats.procurement}</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Procurement Verification</span>
                            <span className="font-medium">{taskStats.procurementVerification}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Construction</span>
                            <span className="font-medium">{taskStats.construction}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Construction Verification</span>
                            <span className="font-medium">{taskStats.constructionVerification}</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Handover</span>
                            <span className="font-medium">{taskStats.handover}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Done</span>
                            <span className="font-medium">{taskStats.done}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Economic Overview</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="text-sm text-gray-500">Average GDP Growth</div>
                            <div className="text-2xl font-semibold text-gray-900">{stats.avgGDP.toFixed(1)}%</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500">Average Unemployment</div>
                            <div className="text-2xl font-semibold text-gray-900">{stats.avgUnemployment.toFixed(1)}%</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500">Average Poverty Rate</div>
                            <div className="text-2xl font-semibold text-gray-900">{stats.avgPovertyRate.toFixed(1)}%</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg border shadow-sm">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Development Overview</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="text-sm text-gray-500">Average Infrastructure Index</div>
                            <div className="text-2xl font-semibold text-gray-900">{stats.avgInfrastructure.toFixed(1)}%</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500">Average Urbanization Rate</div>
                            <div className="text-2xl font-semibold text-gray-900">{stats.avgUrbanization.toFixed(1)}%</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500">Average Internet Access</div>
                            <div className="text-2xl font-semibold text-gray-900">{stats.avgInternet.toFixed(1)}%</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg border shadow-sm">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Education Overview</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="text-sm text-gray-500">Average Literacy Rate</div>
                            <div className="text-2xl font-semibold text-gray-900">{stats.avgLiteracy.toFixed(1)}%</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500">Average School Enrollment</div>
                            <div className="text-2xl font-semibold text-gray-900">{stats.avgEnrollment.toFixed(1)}%</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500">Average Teacher Ratio</div>
                            <div className="text-2xl font-semibold text-gray-900">1:{stats.avgTeacherRatio.toFixed(1)}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="bg-white p-6 rounded-lg border shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium text-gray-900">Province Performance Charts</h3>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setActiveTab('economics')}
                            className={`px-4 py-2 text-sm font-medium rounded-lg ${activeTab === 'economics'
                                    ? 'bg-sekolah-100 text-sekolah-900'
                                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            Economics
                        </button>
                        <button
                            onClick={() => setActiveTab('infrastructure')}
                            className={`px-4 py-2 text-sm font-medium rounded-lg ${activeTab === 'infrastructure'
                                    ? 'bg-sekolah-100 text-sekolah-900'
                                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            Infrastructure
                        </button>
                        <button
                            onClick={() => setActiveTab('education')}
                            className={`px-4 py-2 text-sm font-medium rounded-lg ${activeTab === 'education'
                                    ? 'bg-sekolah-100 text-sekolah-900'
                                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            Education
                        </button>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Economics Charts */}
                    {activeTab === 'economics' && (
                        <div className="space-y-6">
                            <ProvinceChart
                                provinces={provinces}
                                metric="GDP Growth Rate"
                                getValue={(p) => p.indicators.gdp}
                                sortAscending={chartSort.gdp}
                            />
                            <ProvinceChart
                                provinces={provinces}
                                metric="Unemployment Rate"
                                getValue={(p) => p.indicators.unemployment}
                                sortAscending={chartSort.unemployment}
                            />
                            <ProvinceChart
                                provinces={provinces}
                                metric="Poverty Rate"
                                getValue={(p) => p.indicators.povertyRate}
                                sortAscending={chartSort.poverty}
                            />
                        </div>
                    )}

                    {/* Infrastructure Charts */}
                    {activeTab === 'infrastructure' && (
                        <div className="space-y-6">
                            <ProvinceChart
                                provinces={provinces}
                                metric="Infrastructure Index"
                                getValue={(p) => p.indicators.infrastructureIndex}
                                sortAscending={chartSort.infrastructure}
                            />
                            <ProvinceChart
                                provinces={provinces}
                                metric="Urbanization Rate"
                                getValue={(p) => p.indicators.urbanizationRate}
                                sortAscending={chartSort.urbanization}
                            />
                            <ProvinceChart
                                provinces={provinces}
                                metric="Internet Access"
                                getValue={(p) => p.indicators.internetAccess}
                                sortAscending={chartSort.internet}
                            />
                        </div>
                    )}

                    {/* Education Charts */}
                    {activeTab === 'education' && (
                        <div className="space-y-6">
                            <ProvinceChart
                                provinces={provinces}
                                metric="Literacy Rate"
                                getValue={(p) => p.indicators.literacyRate}
                                sortAscending={chartSort.literacy}
                            />
                            <ProvinceChart
                                provinces={provinces}
                                metric="School Enrollment"
                                getValue={(p) => p.indicators.schoolEnrollment}
                                sortAscending={chartSort.enrollment}
                            />
                            <ProvinceChart
                                provinces={provinces}
                                metric="Student-Teacher Ratio"
                                getValue={(p) => p.indicators.teacherRatio}
                                sortAscending={chartSort.teacherRatio}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}