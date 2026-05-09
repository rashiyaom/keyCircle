"use client";
import { useEffect, useState } from "react";
import { vehicleApi } from "../lib/api";
import { MapPin, Users, Fuel, Settings2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    vehicleApi.list().then(res => {
      if (res.success) setVehicles(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="flex-1 flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-zinc-200 border-t-black rounded-full animate-spin dark:border-zinc-800 dark:border-t-white"></div>
        <p className="text-zinc-500 font-medium">Loading market...</p>
      </div>
    </div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Explore Vehicles</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Find the perfect ride for your next journey.</p>
        </div>
      </div>

      {vehicles.length === 0 ? (
        <div className="text-center py-24 bg-white dark:bg-zinc-900 rounded-2xl border dark:border-zinc-800 shadow-sm">
          <p className="text-zinc-500 dark:text-zinc-400 text-lg">No vehicles available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 group flex flex-col translate-y-0 hover:-translate-y-1">
              <div className="aspect-[4/3] bg-zinc-100 dark:bg-zinc-800 relative overflow-hidden">
                {vehicle.image_url ? (
                  <Image src={vehicle.image_url} alt={vehicle.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-400 font-medium">No Image Provided</div>
                )}
                <div className="absolute top-4 right-4 bg-white/95 dark:bg-black/95 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                  ${vehicle.price_per_day}/day
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{vehicle.name}</h3>
                    <p className="text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 text-sm font-medium">
                      <MapPin className="w-4 h-4" /> {vehicle.location || 'Location not specified'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6 mt-2">
                  <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/50 p-2 rounded-lg">
                    <Users className="w-4 h-4 text-zinc-400" />
                    <span className="font-medium">{vehicle.seats || 4} Seats</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/50 p-2 rounded-lg">
                    <Fuel className="w-4 h-4 text-zinc-400" />
                    <span className="capitalize font-medium">{vehicle.fuel_type || 'Petrol'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/50 p-2 rounded-lg col-span-2">
                    <Settings2 className="w-4 h-4 text-zinc-400" />
                    <span className="capitalize font-medium">{vehicle.transmission || 'Automatic Transmission'}</span>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t dark:border-zinc-800/80">
                  <Link 
                    href={`/vehicles/${vehicle.id}`}
                    className="w-full flex items-center justify-center py-3.5 bg-black text-white dark:bg-white dark:text-black rounded-xl font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all active:scale-[0.98]"
                  >
                    Rent Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
