import DendaAktifList from "@/components/user/denda/denda";
import RiwayatDenda from "@/components/user/denda/history";

export default function DendaPage() {
  return (
    <div className="space-y-8 p-4 md:p-6">
      <section>
        <h2 className="text-xl font-bold mb-4">Denda Aktif</h2>
        <DendaAktifList />
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Riwayat Pembayaran Denda</h2>
        <RiwayatDenda />
      </section>
    </div>
  );
}
