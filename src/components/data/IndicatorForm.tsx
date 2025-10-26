import { useStore } from '../../store/store';
import { Button } from '../ui/Button';
import type { Province } from '../../types';

export function IndicatorForm() {
    const { provinces } = useStore();
    const { updateProvince, addIndicator } = useStore((state) => ({
        updateProvince: state.updateProvince,
        addIndicator: state.addIndicator
    }));

    const handleAddIndicator = () => {
        const name = prompt('Enter indicator name (e.g., "digital_literacy"):');
        if (!name) return;

        addIndicator('', name.toLowerCase());
    };

    const handleUpdateIndicators = (province: Province) => {
        const updatedProvince = { ...province };
        const updatedIndicators = { ...province.indicators };

        // Update each indicator
        for (const [key, value] of Object.entries(province.indicators)) {
            updatedIndicators[key] = parseFloat(
                prompt(`Enter ${key.replace(/_/g, ' ')} ${key.includes('ratio') ? '' : '(%)'}`, value.toString()) ||
                value.toString()
            );
        }

        updatedProvince.indicators = updatedIndicators;
        updateProvince(province.id, updatedProvince);
    };

    return (
        <div>
            <div className="flex justify-end mb-4">
                <Button
                    onClick={handleAddIndicator}
                    variant="outline"
                    className="bg-emerald-500 text-white hover:bg-emerald-600 border-0"
                >
                    Add New Indicator
                </Button>
            </div>

            <div className="mt-6">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase">Province</th>
                            <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase">Indicators</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {provinces.map((province) => (
                            <tr key={province.id} className="hover:bg-gray-50">
                                <td className="py-4">
                                    <div className="text-sm font-medium text-gray-900">{province.name}</div>
                                </td>
                                <td className="py-4">
                                    <div className="space-y-1">
                                        {Object.entries(province.indicators).map(([key, value]) => (
                                            <div key={key} className="text-sm text-gray-500">
                                                {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}:
                                                {key.includes('ratio') ? ` 1:${value}` : ` ${value}%`}
                                            </div>
                                        ))}
                                        <Button
                                            onClick={() => handleUpdateIndicators(province)}
                                            variant="outline"
                                            size="sm"
                                            className="mt-2"
                                        >
                                            Update Indicators
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