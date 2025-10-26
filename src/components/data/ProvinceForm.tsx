import type { FC } from 'react';
import { useStore } from '../../store/store';
import { Button } from '../ui/Button';
import type { Province } from '../../types';

export function ProvinceForm() {
    const { provinces } = useStore();
    const { addProvince, updateProvince, deleteProvince } = useStore((state) => ({
        addProvince: state.addProvince,
        updateProvince: state.updateProvince,
        deleteProvince: state.deleteProvince,
    }));

    const handleEdit = (province: Province) => {

        // Update province data with all indicators in a flat structure
        const indicators = {
            gdp: parseFloat(prompt('Enter GDP growth (%)', province.indicators.gdp.toString()) || province.indicators.gdp.toString()),
            unemployment: parseFloat(prompt('Enter unemployment rate (%)', province.indicators.unemployment.toString()) || province.indicators.unemployment.toString()),
            povertyRate: parseFloat(prompt('Enter poverty rate (%)', province.indicators.povertyRate.toString()) || province.indicators.povertyRate.toString()),
            infrastructureIndex: parseFloat(prompt('Enter infrastructure index (%)', province.indicators.infrastructureIndex.toString()) || province.indicators.infrastructureIndex.toString()),
            urbanizationRate: parseFloat(prompt('Enter urbanization rate (%)', province.indicators.urbanizationRate.toString()) || province.indicators.urbanizationRate.toString()),
            internetAccess: parseFloat(prompt('Enter internet access (%)', province.indicators.internetAccess.toString()) || province.indicators.internetAccess.toString()),
            literacyRate: parseFloat(prompt('Enter literacy rate (%)', province.indicators.literacyRate.toString()) || province.indicators.literacyRate.toString()),
            schoolEnrollment: parseFloat(prompt('Enter school enrollment (%)', province.indicators.schoolEnrollment.toString()) || province.indicators.schoolEnrollment.toString()),
            teacherRatio: parseFloat(prompt('Enter teacher ratio', province.indicators.teacherRatio.toString()) || province.indicators.teacherRatio.toString()),
        };

        const updatedProvince = {
            name: prompt('Enter province name', province.name) || province.name,
            indicators: {
                gdp: indicators.gdp,
                unemployment: indicators.unemployment,
                povertyRate: indicators.povertyRate,
                infrastructureIndex: indicators.infrastructureIndex,
                urbanizationRate: indicators.urbanizationRate,
                internetAccess: indicators.internetAccess,
                literacyRate: indicators.literacyRate,
                schoolEnrollment: indicators.schoolEnrollment,
                teacherRatio: indicators.teacherRatio
            }
        };

        updateProvince(province.id, updatedProvince);

    };

    const handleDelete = (provinceId: string) => {
        if (confirm('Are you sure you want to delete this province?')) {
            deleteProvince(provinceId);
        }
    };

    const handleAdd = () => {
        const newProvince: Omit<Province, 'id'> = {
            name: prompt('Enter province name') || 'New Province',
            code: prompt('Enter province code') || 'XX',
            coordinates: [parseFloat(prompt('Enter latitude') || '0'), parseFloat(prompt('Enter longitude') || '0')],
            indicators: {
                economic: {
                    gdp: parseFloat(prompt('Enter GDP growth (%)') || '0'),
                    unemployment: parseFloat(prompt('Enter unemployment rate (%)') || '0'),
                    povertyRate: parseFloat(prompt('Enter poverty rate (%)') || '0'),
                },
                development: {
                    infrastructureIndex: parseFloat(prompt('Enter infrastructure index (%)') || '0'),
                    urbanizationRate: parseFloat(prompt('Enter urbanization rate (%)') || '0'),
                    internetAccess: parseFloat(prompt('Enter internet access (%)') || '0'),
                },
                education: {
                    literacyRate: parseFloat(prompt('Enter literacy rate (%)') || '0'),
                    schoolEnrollment: parseFloat(prompt('Enter school enrollment (%)') || '0'),
                    teacherRatio: parseFloat(prompt('Enter teacher ratio') || '0'),
                }
            }
        };

        addProvince(newProvince);
    };

    return (
        <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Manage Provinces</h3>
                <Button onClick={handleAdd} variant="outline">Add New Province</Button>
            </div>

            <div className="mt-6 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            {/* Basic Info */}
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase sticky left-0 bg-white border-r">Province</th>

                            {/* Growth & Economy */}
                            <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase whitespace-nowrap bg-green-50">GDP Growth</th>
                            <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase whitespace-nowrap bg-green-50">Employment Rate</th>
                            <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase whitespace-nowrap bg-green-50">Poverty Reduction</th>

                            {/* Infrastructure & Development */}
                            <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase whitespace-nowrap bg-orange-50">Infrastructure</th>
                            <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase whitespace-nowrap bg-orange-50">Urbanization</th>
                            <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase whitespace-nowrap bg-orange-50">Internet Access</th>

                            {/* Education */}
                            <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase whitespace-nowrap bg-blue-50">Literacy</th>
                            <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase whitespace-nowrap bg-blue-50">Enrollment</th>
                            <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase whitespace-nowrap bg-blue-50">Teacher Ratio</th>

                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase sticky right-0 bg-white border-l">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {provinces.map((province) => (
                            <tr key={province.id} className="hover:bg-gray-50">
                                <td className="py-4 px-4 text-sm text-gray-900 font-medium sticky left-0 bg-white border-r">{province.name}</td>

                                {/* Growth & Economy */}
                                <td className="py-4 px-4 text-sm text-center bg-green-50/30">
                                    <span className="font-medium text-green-700">{province.indicators.gdp}%</span>
                                </td>
                                <td className="py-4 px-4 text-sm text-center bg-green-50/30">
                                    <span className="font-medium text-green-700">{100 - province.indicators.unemployment}%</span>
                                </td>
                                <td className="py-4 px-4 text-sm text-center bg-green-50/30">
                                    <span className="font-medium text-green-700">{100 - province.indicators.povertyRate}%</span>
                                </td>

                                {/* Infrastructure & Development */}
                                <td className="py-4 px-4 text-sm text-center bg-orange-50/30">
                                    <span className="font-medium text-orange-700">{province.indicators.infrastructureIndex}%</span>
                                </td>
                                <td className="py-4 px-4 text-sm text-center bg-orange-50/30">
                                    <span className="font-medium text-orange-700">{province.indicators.urbanizationRate}%</span>
                                </td>
                                <td className="py-4 px-4 text-sm text-center bg-orange-50/30">
                                    <span className="font-medium text-orange-700">{province.indicators.internetAccess}%</span>
                                </td>

                                {/* Education */}
                                <td className="py-4 px-4 text-sm text-center bg-blue-50/30">
                                    <span className="font-medium text-blue-700">{province.indicators.literacyRate}%</span>
                                </td>
                                <td className="py-4 px-4 text-sm text-center bg-blue-50/30">
                                    <span className="font-medium text-blue-700">{province.indicators.schoolEnrollment}%</span>
                                </td>
                                <td className="py-4 px-4 text-sm text-center bg-blue-50/30">
                                    <span className="font-medium text-blue-700">1:{province.indicators.teacherRatio}</span>
                                </td>

                                <td className="py-4 px-4 sticky right-0 bg-white border-l">
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={() => handleEdit(province)}
                                            variant="secondary"
                                            size="sm"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() => handleDelete(province.id)}
                                            variant="ghost"
                                            size="sm"
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}