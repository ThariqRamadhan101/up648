import { useMemo, useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip, ZoomControl } from 'react-leaflet';
import { useStore } from '../store/store';
import { provinceCoordinates } from '../data/provinces';
import { MapFilters } from '../components/map/MapFilters';
import { DataLegend, LegendItem } from '../components/map/DataLegend';
import { overlayOptions } from '../components/map/MapFilters';
import 'leaflet/dist/leaflet.css';

// Helper Functions
function calculateProvinceProgress(provinceId: string, tasks: any[]) {
  const provinceTasks = tasks.filter(task => task.province === provinceId);
  if (provinceTasks.length === 0) return 0;
  const completedTasks = provinceTasks.filter(task => task.stage === 'done').length;
  return (completedTasks / provinceTasks.length) * 100;
}

function getColorByProgress(progress: number) {
  if (progress >= 75) return '#22c55e'; // green-500
  if (progress >= 50) return '#f97316'; // orange-500
  if (progress >= 25) return '#eab308'; // yellow-500
  return '#ef4444'; // red-500
}

function Map() {
  const [isLoading, setIsLoading] = useState(true);
  const { tasks, provinces, filters } = useStore(state => ({
    tasks: state.getFilteredTasks(),
    provinces: state.provinces,
    filters: state.filters
  }));

  useEffect(() => {
    // Simulate loading delay for smoother transitions
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [filters.overlays]);

  // Get indicator value and details
  const getIndicatorDetails = useMemo(() => (provinceId: string) => {
    const province = provinces.find(p => p.id === provinceId);
    if (!province?.indicators) return { value: 0, details: {} };

    if (filters.overlays.length === 0) {
      const value = calculateProvinceProgress(provinceId, tasks);
      return { value, details: { "Task Progress": `${value.toFixed(1)}%` } };
    }

    const { indicators } = province;
    const details: Record<string, string> = {};

    // Add all selected indicators to details
    filters.overlays.forEach(overlay => {
      switch (overlay) {
        case 'gdp':
          details["GDP Growth"] = `${indicators.gdp.toFixed(1)}%`;
          break;
        case 'unemployment':
          details["Employment Rate"] = `${(100 - indicators.unemployment).toFixed(1)}%`;
          break;
        case 'poverty':
          details["Poverty Reduction"] = `${(100 - indicators.povertyRate).toFixed(1)}%`;
          break;
        case 'infrastructure':
          details["Infrastructure"] = `${indicators.infrastructureIndex.toFixed(1)}%`;
          break;
        case 'urbanization':
          details["Urbanization"] = `${indicators.urbanizationRate.toFixed(1)}%`;
          break;
        case 'internet':
          details["Internet Access"] = `${indicators.internetAccess.toFixed(1)}%`;
          break;
        case 'literacy':
          details["Literacy Rate"] = `${indicators.literacyRate.toFixed(1)}%`;
          break;
        case 'enrollment':
          details["School Enrollment"] = `${indicators.schoolEnrollment.toFixed(1)}%`;
          break;
        case 'teacherRatio':
          details["Teacher Ratio"] = `1:${indicators.teacherRatio.toFixed(1)}`;
          break;
      }
    });

    // Use the first selected indicator for the circle color
    const primaryValue = filters.overlays[0] ? (() => {
      switch (filters.overlays[0]) {
        case 'gdp': return indicators.gdp;
        case 'unemployment': return 100 - indicators.unemployment;
        case 'poverty': return 100 - indicators.povertyRate;
        case 'infrastructure': return indicators.infrastructureIndex;
        case 'urbanization': return indicators.urbanizationRate;
        case 'internet': return indicators.internetAccess;
        case 'literacy': return indicators.literacyRate;
        case 'enrollment': return indicators.schoolEnrollment;
        case 'teacherRatio': return Math.max(0, Math.min(100, (30 - indicators.teacherRatio) * 5));
        default: return calculateProvinceProgress(provinceId, tasks);
      }
    })() : calculateProvinceProgress(provinceId, tasks);

    return { value: primaryValue, details };
  }, [filters.overlays, tasks, provinces]);

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col">
      {/* Map Content */}
      <div className="flex-1 grid grid-cols-6 gap-4">
        {/* Left Sidebar */}
        <div className="space-y-3">
          {/* Progress Scale Legend */}
          <div className="bg-white p-3 rounded-lg border shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Project Map</h2>
            <DataLegend title="Progress Scale">
              <div className="space-y-1.5">
                <LegendItem color="#ef4444" label="0-25%" />
                <LegendItem color="#eab308" label="25-50%" />
                <LegendItem color="#f97316" label="50-75%" />
                <LegendItem color="#22c55e" label="75-100%" />
              </div>
            </DataLegend>
          </div>

          {/* Map Filters */}
          <div className="bg-white rounded-lg border shadow-sm">
            <MapFilters />
          </div>

          {/* Indicator Legend */}
          {filters.overlays.length > 0 && (
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <DataLegend
                title={filters.overlays.length === 1
                  ? (overlayOptions.find((o: { id: string; name: string }) => o.id === filters.overlays[0])?.name || 'Selected Indicator')
                  : `${filters.overlays.length} Indicators Selected`}
              >
                <div className="space-y-2">
                  <LegendItem color="#22c55e" label="75-100%" />
                  <LegendItem color="#f97316" label="50-75%" />
                  <LegendItem color="#eab308" label="25-50%" />
                  <LegendItem color="#ef4444" label="0-25%" />
                </div>
              </DataLegend>
            </div>
          )}
        </div>

        {/* Map Container */}
        <div className="relative col-span-5 bg-white rounded-lg border shadow h-full">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent" />
            </div>
          )}

          <MapContainer
            center={[-2.548926, 118.014863]}
            zoom={5}
            className="h-full w-full rounded-lg"
            zoomControl={false}
            maxZoom={10}
            minZoom={4}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ZoomControl position="bottomright" />

            {Object.entries(provinceCoordinates).map(([id, coordinates]) => {
              const details = getIndicatorDetails(id);
              const provinceTasks = tasks.filter(task => task.province === id);
              const province = provinces.find(p => p.id === id);

              return (
                <CircleMarker
                  key={id}
                  center={coordinates as [number, number]}
                  radius={10 + (provinceTasks.length * 2)}
                  fillColor={getColorByProgress(details.value)}
                  fillOpacity={0.7}
                  weight={2}
                  color="white"
                >
                  <Tooltip permanent={false}>
                    <div className="font-medium">{province?.name}</div>
                    <div className="text-sm space-y-1 mt-1 border-t pt-1">
                      {Object.entries(details.details).map(([label, value]) => (
                        <div key={label} className="flex justify-between gap-2">
                          <span>{label}:</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                      <div className="flex justify-between gap-2">
                        <span>Tasks:</span>
                        <span className="font-medium">{provinceTasks.length}</span>
                      </div>
                    </div>
                  </Tooltip>
                </CircleMarker>
              );
            })}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default Map;

