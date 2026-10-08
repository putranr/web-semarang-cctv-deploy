import {
  useEffect,
  useState,
} from 'react';

import {
  Camera,
  Cable,
  Settings,
  Wrench,
} from 'lucide-react';

import {
  ServiceCard,
} from './ServiceCard';

import {
  ServiceModal,
} from './ServiceModal';

import type {
  Service,
} from '../data/services';

import {
  fetchPublicServices,
} from '../lib/publicServicesApi';

/**
 * Mapping nama icon dari database
 * ke komponen Lucide.
 */
const iconMap = {
  Camera,
  Cable,
  Settings,
  Wrench,
};

type IconName =
  keyof typeof iconMap;

/**
 * Ubah response API menjadi
 * format lama yang dipakai
 * ServiceCard dan ServiceModal.
 */
function mapService(
  service: {
    title: string;
    description: string;
    detail: string;
    features: string[];
    icon: string;
  },
): Service {
  const Icon =
    iconMap[
      service.icon as IconName
    ] ?? Camera;

  return {
    title: service.title,
    description:
      service.description,

    icon: Icon,

    detail: service.detail,

    features:
      service.features,
  };
}

export function PublicServicesSection() {
  const [
    services,
    setServices,
  ] = useState<Service[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState('');

  const [
    selectedService,
    setSelectedService,
  ] =
    useState<Service | null>(
      null,
    );

  useEffect(() => {
    const loadServices =
      async () => {
        try {
          setLoading(true);
          setError('');

          const data =
            await fetchPublicServices();

          setServices(
            data.map(
              mapService,
            ),
          );
        } catch (error) {
          setError(
            error instanceof Error
              ? error.message
              : 'Gagal mengambil layanan',
          );
        } finally {
          setLoading(false);
        }
      };

    loadServices();
  }, []);

  return (
    <>
      <section
        id="services"
        className="public-services-section"
      >
        <div className="public-services-container">
          <div className="public-services-heading">
            <div>
              <span>
                SERVICES
              </span>

              <h2>
                Jasa & Layanan
              </h2>

              <p>
                Solusi installation,
                maintenance, dan
                pengembangan sistem CCTV
                untuk berbagai kebutuhan
                keamanan.
              </p>
            </div>
          </div>

          {error && (
            <div className="public-articles-error">
              {error}
            </div>
          )}

          {loading ? (
            <div className="public-articles-status">
              Memuat layanan...
            </div>
          ) : services.length ===
            0 ? (
            <div className="public-articles-status">
              Belum ada layanan yang
              dipublikasikan.
            </div>
          ) : (
            <div className="public-services-grid">
              {services.map(
                (service) => (
                  <ServiceCard
                    key={
                      service.title
                    }
                    service={
                      service
                    }
                    onClick={() =>
                      setSelectedService(
                        service,
                      )
                    }
                  />
                ),
              )}
            </div>
          )}
        </div>
      </section>

      <ServiceModal
        service={
          selectedService
        }
        onClose={() =>
          setSelectedService(
            null,
          )
        }
      />
    </>
  );
}